<?php

namespace App\Console\Commands;

use App\Services\ChunkedUploadService;
use Illuminate\Console\Command;

class PruneUploads extends Command
{
    protected $signature = 'uploads:prune';

    protected $description = 'Delete abandoned upload fragments and finished files that were never attached to a record';

    public function handle(ChunkedUploadService $uploads): int
    {
        $result = $uploads->prune();

        $this->components->info("Expired {$result['expired']} unfinished and {$result['orphaned']} unused upload(s).");

        return self::SUCCESS;
    }
}
