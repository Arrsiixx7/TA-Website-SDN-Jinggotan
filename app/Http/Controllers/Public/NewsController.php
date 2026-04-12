<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\News;
use Inertia\Inertia;

class NewsController extends Controller
{
    /**
     * Display news listing.
     */
    public function index()
    {
        $news = News::latest()->paginate(4)->withQueryString();

        return Inertia::render('public/news', [
            'news' => $news,
        ]);
    }

    /**
     * Display a specific news article.
     */
    public function show(string $slug)
    {
        $news = News::where('slug', $slug)->firstOrFail();
        
        // Get related news (max 3)
        $relatedNews = News::where('id', '!=', $news->id)
            ->latest()
            ->take(3)
            ->get();

        return Inertia::render('public/news-detail', [
            'news' => $news,
            'relatedNews' => $relatedNews,
        ]);
    }
}
