<?php

namespace App\Console\Commands;

use App\Models\NewsAnnouncement;
use Illuminate\Console\Command;

class PopulateNewsExcerpts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'news:populate-excerpts {--force : Force update even if excerpt exists}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Populate excerpts for news announcements that don\'t have them';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Populating news excerpts...');

        $query = NewsAnnouncement::query();

        if (!$this->option('force')) {
            $query->where(function ($q) {
                $q->whereNull('excerpt')
                  ->orWhere('excerpt', '');
            });
        }

        $news = $query->get();

        if ($news->isEmpty()) {
            $this->info('No news announcements need excerpt updates.');
            return Command::SUCCESS;
        }

        $bar = $this->output->createProgressBar($news->count());
        $bar->start();

        $updated = 0;
        foreach ($news as $item) {
            if (empty($item->excerpt) || $this->option('force')) {
                // Generate excerpt from content
                $excerpt = substr(strip_tags($item->content), 0, 200);
                if (strlen($excerpt) === 200) {
                    $excerpt .= '...';
                }

                // Use update to bypass the accessor and set the actual column value
                $item->update(['excerpt' => $excerpt]);
                $updated++;
            }
            $bar->advance();
        }

        $bar->finish();
        $this->newLine(2);
        $this->info("Successfully updated {$updated} news announcements.");

        return Command::SUCCESS;
    }
}
