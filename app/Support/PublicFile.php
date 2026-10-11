<?php

namespace App\Support;

use Illuminate\Support\Facades\Storage;

/**
 * Resolves a stored file path to a URL only when the file really exists,
 * so pages never render a dead link.
 */
class PublicFile
{
    /**
     * @param  string|null  $path  Path saved in the database, relative to the public disk or to /public.
     */
    public static function url(?string $path): ?string
    {
        if (blank($path)) {
            return null;
        }

        if (filter_var($path, FILTER_VALIDATE_URL)) {
            return $path;
        }

        $path = ltrim($path, '/');

        if (preg_match('#(^|[\\\\/])\.\.([\\\\/]|$)#', $path)) {
            return null;
        }

        if (Storage::disk('public')->exists($path)) {
            return asset('storage/'.$path);
        }

        if (is_file(public_path($path))) {
            return asset($path);
        }

        return null;
    }
}
