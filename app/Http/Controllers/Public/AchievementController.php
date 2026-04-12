<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Achievement;
use Inertia\Inertia;

class AchievementController extends Controller
{
    /**
     * Display achievements listing.
     */
    public function index()
    {
        $achievements = Achievement::latest()->paginate(12)->withQueryString();

        return Inertia::render('public/achievements', [
            'achievements' => $achievements,
        ]);
    }

    /**
     * Display a specific achievement.
     */
    public function show($id)
    {
        $achievement = Achievement::findOrFail($id);

        return Inertia::render('public/achievement-detail', [
            'achievement' => $achievement,
        ]);
    }
}
