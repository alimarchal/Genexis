<?php

namespace App\Http\Controllers;

abstract class Controller
{
    /**
     * Page size taken from ?per_page, bounded so a visitor cannot request the whole table.
     */
    protected function perPage(int $default = 15, int $max = 100): int
    {
        return max(1, min((int) request()->input('per_page', $default), $max));
    }
}
