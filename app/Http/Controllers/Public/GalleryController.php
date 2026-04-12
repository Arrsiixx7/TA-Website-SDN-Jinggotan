<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Inertia\Inertia;

class GalleryController extends Controller
{
    /**
     * Display gallery listing.
     */
    public function index()
    {
        $galleries = Gallery::latest()->paginate(4)->withQueryString();

        return Inertia::render('public/gallery', [
            'galleries' => $galleries,
        ]);
    }
}
