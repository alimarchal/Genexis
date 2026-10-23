<?php

namespace App\Enums;

/**
 * The fixed list of categories a download can belong to.
 */
enum DownloadCategory: string
{
    case General = 'General';
    case Document = 'Document';
    case Picture = 'Picture';
    case Form = 'Form';
    case Report = 'Report';

    /**
     * Words that were used in the past (or are common misspellings) and the category they belong to.
     *
     * @var array<string, self>
     */
    private const ALIASES = [
        'pic' => self::Picture,
        'pics' => self::Picture,
        'image' => self::Picture,
        'images' => self::Picture,
        'photo' => self::Picture,
        'documents' => self::Document,
        'doc' => self::Document,
        'forms' => self::Form,
        'reports' => self::Report,
    ];

    /**
     * @return list<string>
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    /**
     * Map any stored spelling ("document", "Dcument", "forms", "pic", ...) to the category it was meant to be.
     * Anything that cannot be recognised becomes General.
     */
    public static function normalize(?string $value): self
    {
        $word = mb_strtolower(trim((string) $value));

        if ($word === '') {
            return self::General;
        }

        foreach (self::cases() as $case) {
            if (mb_strtolower($case->value) === $word) {
                return $case;
            }
        }

        if (isset(self::ALIASES[$word])) {
            return self::ALIASES[$word];
        }

        $closest = self::General;
        $shortest = PHP_INT_MAX;

        foreach (self::cases() as $case) {
            $distance = levenshtein($word, mb_strtolower($case->value));

            if ($distance < $shortest) {
                $shortest = $distance;
                $closest = $case;
            }
        }

        return $shortest <= 2 ? $closest : self::General;
    }
}
