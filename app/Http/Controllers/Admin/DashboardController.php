<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Achievement;
use App\Models\ClassDistribution;
use App\Models\Gallery;
use App\Models\Message;
use App\Models\Teacher;
use App\Models\SchoolProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard with statistics.
     */
    public function index()
    {
        $stats = [
            'total_students' => SchoolProfile::sum('total_students') ?: 0,
            'total_teachers' => Teacher::count(),
            'total_classes' => ClassDistribution::count(),
            'total_achievements' => Achievement::count(),
            'total_galleries' => Gallery::count(),
            'total_messages' => Message::count(),
            'unread_messages' => Message::where('is_read', false)->count(),
        ];

        // Last 7 days message chart data
        $chartData = Message::selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->where('created_at', '>=', now()->subDays(7))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // Recent messages
        $recentMessages = Message::latest()->take(5)->get();

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'chartData' => $chartData,
            'recentMessages' => $recentMessages,
        ]);
    }
}
