<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\CareerResource;
use App\Models\Career;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CareerController extends Controller
{
    /**
     * Open vacancies: active and not past their closing date.
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $careers = Career::query()->active()->open()
            ->orderByDesc('is_featured')
            ->latest()
            ->paginate(min((int) $request->integer('per_page', 12), 50))
            ->withQueryString();

        return CareerResource::collection($careers);
    }

    public function show(int $career): CareerResource
    {
        return new CareerResource(Career::query()->active()->open()->findOrFail($career));
    }
}
