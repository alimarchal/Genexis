<?php

namespace App\Support;

/**
 * Known misspellings found in migrated website content and what they should read.
 */
class SpellingFixes
{
    /**
     * @var array<string, string> misspelling => correct word (matched case-insensitively, the original capitalisation is kept)
     */
    public const WORDS = [
        'Tendor' => 'Tender',
        'Tendors' => 'Tenders',
        'Carrer' => 'Career',
        'Hairing' => 'Hiring',
        'Evalutioan' => 'Evaluation',
    ];

    /**
     * Correct the known misspellings in a text, keeping UPPER, Title and lower case as they were written.
     */
    public static function apply(string $text): string
    {
        foreach (self::WORDS as $wrong => $right) {
            $text = preg_replace_callback('/\b'.preg_quote($wrong, '/').'\b/i', function (array $match) use ($right) {
                $found = $match[0];

                return match (true) {
                    $found === mb_strtoupper($found) => mb_strtoupper($right),
                    $found === mb_strtolower($found) => mb_strtolower($right),
                    default => $right,
                };
            }, $text) ?? $text;
        }

        return $text;
    }
}
