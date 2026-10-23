<?php

namespace App\Extraction;

use Closure;
use Illuminate\Database\Eloquent\Model;

/**
 * One extractable data set: which model it comes from, which fields leave the system,
 * which filters it understands and how its attached files are described.
 */
final class Dataset
{
    /** @var list<string> */
    public array $fields = [];

    /** @var list<string> */
    public array $filters = [];

    /** @var list<string> */
    public array $with = [];

    /** @var array<string, Closure(Model): mixed> */
    public array $computed = [];

    /** @var array<string, array{name?: Closure(Model): ?string, url?: Closure(Model): ?string}> */
    public array $files = [];

    /** @var array{column: string, active: mixed, inactive: mixed}|null */
    public ?array $status = null;

    public bool $sensitive = false;

    /**
     * @param  class-string<Model>  $model
     */
    public function __construct(
        public readonly string $slug,
        public readonly string $label,
        public readonly string $model,
        public readonly string $description,
    ) {}

    /**
     * @param  class-string<Model>  $model
     */
    public static function make(string $slug, string $label, string $model, string $description): self
    {
        return new self($slug, $label, $model, $description);
    }

    /**
     * @param  list<string>  $fields  database columns that are exposed
     */
    public function fields(array $fields): self
    {
        $this->fields = $fields;

        return $this;
    }

    /**
     * @param  list<string>  $filters  fields that can be filtered with filter[field]=value
     */
    public function filterable(array $filters): self
    {
        $this->filters = $filters;

        return $this;
    }

    /**
     * Active / inactive is stored differently per table; this says how.
     */
    public function status(string $column, mixed $active, mixed $inactive): self
    {
        $this->status = ['column' => $column, 'active' => $active, 'inactive' => $inactive];

        return $this;
    }

    /**
     * @param  array<string, Closure(Model): mixed>  $computed  extra values built from loaded relations
     * @param  list<string>  $with  relations those closures need
     */
    public function computed(array $computed, array $with = []): self
    {
        $this->computed = $computed;
        $this->with = $with;

        return $this;
    }

    /**
     * @param  array<string, array{name?: Closure(Model): ?string, url?: Closure(Model): ?string}>  $files  column that holds a stored file path => how to name / link it
     */
    public function files(array $files): self
    {
        $this->files = $files;

        return $this;
    }

    /**
     * Needs the separate "extract sensitive data" permission.
     */
    public function sensitive(): self
    {
        $this->sensitive = true;

        return $this;
    }
}
