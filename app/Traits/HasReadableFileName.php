<?php

namespace App\Traits;

use Illuminate\Support\Str;

/**
 * Stored uploads get a random name on disk. Models that keep the name the file was uploaded with
 * use this to show and send a readable name instead, falling back to a name built from the record
 * for files uploaded before the original name was kept.
 */
trait HasReadableFileName
{
    /**
     * @param  string  $storedPath  the path on disk (random name)
     * @param  string|null  $originalName  the name the admin uploaded the file with, when known
     * @param  string  $fallbackBase  name without extension, used when the original name is unknown
     */
    protected function readableFileName(string $storedPath, ?string $originalName, string $fallbackBase): string
    {
        $extension = pathinfo($storedPath, PATHINFO_EXTENSION);
        $name = trim((string) $originalName);

        if ($name === '') {
            return $extension === '' ? $fallbackBase : "{$fallbackBase}.{$extension}";
        }

        $hasExtension = strtolower(pathinfo($name, PATHINFO_EXTENSION)) === strtolower($extension);

        return $hasExtension || $extension === '' ? $name : $name.'.'.Str::lower($extension);
    }
}
