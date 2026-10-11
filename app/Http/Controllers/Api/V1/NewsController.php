<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\NewsResource;
use App\Models\NewsAnnouncement;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class NewsController extends Controller
{
    /**
     * Published news, newest first. Filters: category, is_featured, title.
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $news = QueryBuilder::for(NewsAnnouncement::query()->published()->recent())
            ->allowedFilters([
                AllowedFilter::exact('category'),
                AllowedFilter::exact('is_featured'),
                AllowedFilter::partial('title'),
            ])
            ->defaultSort('-published_date', '-id')
            ->paginate(min((int) $request->integer('per_page', 12), 50))
            ->withQueryString();

        return NewsResource::collection($news);
    }

    public function show(string $slug): NewsResource
    {
        return new NewsResource(
            NewsAnnouncement::query()->published()->recent()->where('slug', $slug)->firstOrFail()
        );
    }
}
