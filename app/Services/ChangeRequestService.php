<?php

namespace App\Services;

use App\Enums\ChangeRequestStatus;
use App\Exceptions\ChangeRequestException;
use App\Models\ChangeRequest;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Routing\Route;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use ReflectionMethod;
use ReflectionNamedType;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

/**
 * Maker-checker for website content.
 *
 * A maker's add / edit / delete request is validated exactly as the controller would validate it, then stored
 * instead of executed. When a checker approves it, the very same controller action runs with the stored input as
 * the maker, so every rule (validation, uploads, created-by tracking) stays in one place.
 */
class ChangeRequestService
{
    private const DISK = 'local';

    private const ACTIONS = ['store' => 'create', 'update' => 'update', 'destroy' => 'delete'];

    /**
     * Whether this request is a change that must be held because a maker made it.
     */
    public function mustHold(Request $request): bool
    {
        $user = $request->user();
        $route = $request->route();

        if (! $user || ! $route instanceof Route || ! $route->getName() || ! $user->can(config('bank.maker_checker.maker_permission'))) {
            return false;
        }

        [$module, $method] = $this->splitRouteName($route->getName());

        return isset(self::ACTIONS[$method]) && ! in_array($module, config('bank.maker_checker.excluded_modules', []), true);
    }

    /**
     * Validate the request like the controller would, then store it as a pending change.
     */
    public function hold(Request $request, User $maker): ChangeRequest
    {
        $route = $request->route();
        [$module, $method] = $this->splitRouteName($route->getName());

        $this->validateLikeController($route);

        $subject = collect($route->parameters())->first(fn ($value) => $value instanceof Model);
        $payload = Arr::except($request->input(), ['_token', '_method']);

        return ChangeRequest::create([
            'module' => $module,
            'module_label' => Str::headline(Str::afterLast($module, '.')),
            'action' => self::ACTIONS[$method],
            'route_name' => $route->getName(),
            'route_parameters' => collect($route->parameters())
                ->map(fn ($value) => $value instanceof Model ? $value->getRouteKey() : $value)
                ->all(),
            'subject_type' => $subject?->getMorphClass(),
            'subject_id' => $subject?->getKey(),
            'summary' => $this->summarise($payload, $subject, $module),
            'payload' => $payload,
            'files' => $this->storeFiles($request),
            'maker_id' => $maker->id,
        ]);
    }

    /**
     * Run the stored change as its maker. Only a different user holding the checker permission may do this.
     *
     * @throws ChangeRequestException when the change cannot be decided or no longer applies
     */
    public function approve(ChangeRequest $changeRequest, User $checker): void
    {
        $this->assertMayDecide($changeRequest, $checker);

        if ($changeRequest->maker_id === $checker->id) {
            throw new ChangeRequestException('You cannot approve a change you made yourself. Ask another checker.');
        }

        try {
            DB::transaction(function () use ($changeRequest, $checker) {
                $locked = ChangeRequest::query()->lockForUpdate()->findOrFail($changeRequest->id);

                if (! $locked->isPending()) {
                    throw new ChangeRequestException('This change has already been decided.');
                }

                $this->replay($locked);

                $locked->forceFill([
                    'status' => ChangeRequestStatus::Approved,
                    'checker_id' => $checker->id,
                    'reviewed_at' => now(),
                    'failure_reason' => null,
                ])->save();
            });
        } catch (ChangeRequestException $exception) {
            $changeRequest->forceFill(['failure_reason' => $exception->getMessage()])->save();

            throw $exception;
        }

        $this->deleteFiles($changeRequest);
    }

    /**
     * @throws ChangeRequestException
     */
    public function reject(ChangeRequest $changeRequest, User $checker, string $reason): void
    {
        $this->assertMayDecide($changeRequest, $checker);

        $changeRequest->forceFill([
            'status' => ChangeRequestStatus::Rejected,
            'checker_id' => $checker->id,
            'reviewed_at' => now(),
            'rejection_reason' => $reason,
        ])->save();

        $this->deleteFiles($changeRequest);
    }

    /**
     * @throws ChangeRequestException
     */
    private function assertMayDecide(ChangeRequest $changeRequest, User $checker): void
    {
        if (! $checker->can(config('bank.maker_checker.checker_permission'))) {
            throw new ChangeRequestException('You are not allowed to approve or reject changes.');
        }

        if (! $changeRequest->isPending()) {
            throw new ChangeRequestException('This change has already been decided.');
        }
    }

    /**
     * Run the controller action the maker asked for, as the maker.
     *
     * @throws ChangeRequestException
     */
    private function replay(ChangeRequest $changeRequest): void
    {
        $maker = $changeRequest->maker;
        $method = ['create' => 'POST', 'update' => 'PUT', 'delete' => 'DELETE'][$changeRequest->action];

        $replay = Request::create(
            route($changeRequest->route_name, $changeRequest->route_parameters ?? [], false),
            $method,
            $changeRequest->payload ?? [],
            [],
            $this->restoreFiles($changeRequest),
        );
        $replay->setUserResolver(fn () => $maker);

        $router = app('router');
        $original = app('request');
        $checker = Auth::user();

        try {
            $route = $router->getRoutes()->match($replay);
            $replay->setRouteResolver(fn () => $route);
            $route->bind($replay);

            app()->instance('request', $replay);
            Auth::setUser($maker);

            $router->substituteBindings($route);
            $router->substituteImplicitBindings($route);

            $route->run();
        } catch (ValidationException $exception) {
            throw new ChangeRequestException('The change no longer passes validation: '.implode(' ', $exception->validator->errors()->all()));
        } catch (ModelNotFoundException) {
            throw new ChangeRequestException('The record this change is about no longer exists.');
        } catch (HttpExceptionInterface $exception) {
            throw new ChangeRequestException($exception->getStatusCode() === 404
                ? 'The record this change is about no longer exists.'
                : 'The change could not be applied: '.$exception->getMessage());
        } finally {
            app()->instance('request', $original);
            $checker ? Auth::setUser($checker) : null;
            $original->hasSession() ? $original->session()->forget(['success', 'error']) : null;
        }
    }

    private function validateLikeController(Route $route): void
    {
        $controller = $route->getController();

        if ($controller === null) {
            return;
        }

        foreach ((new ReflectionMethod($controller, $route->getActionMethod()))->getParameters() as $parameter) {
            $type = $parameter->getType();

            if ($type instanceof ReflectionNamedType && ! $type->isBuiltin() && is_subclass_of($type->getName(), FormRequest::class)) {
                app()->make($type->getName());
            }
        }
    }

    /**
     * @return array{0: string, 1: string} resource route prefix and action, e.g. ["news-announcements", "store"]
     */
    private function splitRouteName(string $name): array
    {
        return [Str::beforeLast($name, '.'), Str::afterLast($name, '.')];
    }

    /**
     * @param  array<string, mixed>  $payload
     */
    private function summarise(array $payload, ?Model $subject, string $module): string
    {
        foreach (['title', 'name', 'full_name', 'heading', 'message', 'code', 'fiscal_year', 'annual_report_fiscal_year'] as $key) {
            if (isset($payload[$key]) && is_scalar($payload[$key]) && filled($payload[$key])) {
                return Str::limit((string) $payload[$key], 240);
            }
        }

        foreach (['title', 'name', 'full_name', 'heading', 'code'] as $key) {
            if ($subject && filled($subject->getAttribute($key))) {
                return Str::limit((string) $subject->getAttribute($key), 240);
            }
        }

        return Str::headline(Str::afterLast($module, '.')).($subject ? ' #'.$subject->getKey() : '');
    }

    /**
     * Keep files that were posted directly, privately, until the change is decided.
     *
     * @return list<array{key: string, path: string, name: string, mime: string}>
     */
    private function storeFiles(Request $request): array
    {
        $stored = [];

        foreach (Arr::dot($request->allFiles()) as $key => $file) {
            if ($file instanceof UploadedFile) {
                $stored[] = [
                    'key' => $key,
                    'path' => $file->store('pending-changes/'.now()->format('Y/m'), self::DISK),
                    'name' => $file->getClientOriginalName(),
                    'mime' => (string) $file->getClientMimeType(),
                ];
            }
        }

        return $stored;
    }

    /**
     * @return array<string, mixed>
     */
    private function restoreFiles(ChangeRequest $changeRequest): array
    {
        $files = [];

        foreach ($changeRequest->files ?? [] as $file) {
            if (! Storage::disk(self::DISK)->exists($file['path'])) {
                throw new ChangeRequestException('An attached file is missing, so the change cannot be applied.');
            }

            Arr::set($files, $file['key'], new UploadedFile(Storage::disk(self::DISK)->path($file['path']), $file['name'], $file['mime'], null, true));
        }

        return $files;
    }

    private function deleteFiles(ChangeRequest $changeRequest): void
    {
        foreach ($changeRequest->files ?? [] as $file) {
            Storage::disk(self::DISK)->delete($file['path']);
        }
    }
}
