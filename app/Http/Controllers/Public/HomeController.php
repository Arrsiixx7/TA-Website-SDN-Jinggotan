<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Achievement;
use App\Models\Gallery;
use App\Models\News;
use App\Models\SchoolProfile;
use App\Models\Teacher;
use App\Models\VisionMission;
use App\Models\ClassDistribution;
use App\Models\Facility;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the home page.
     */
    public function index()
    {
        // 🔥 DETEKSI KEPALA SEKOLAH DARI POSITION
        $allTeachers = Teacher::all();
        $principal = $allTeachers->first(fn($t) =>
            $t->role === 'principal' || stripos($t->position, 'kepala') !== false
        );

        return Inertia::render('public/home', [
            'news' => News::latest()->take(4)->get(),
            'galleries' => Gallery::latest()->take(6)->get(),
            'schoolProfile' => SchoolProfile::first(),
            'visionMission' => VisionMission::first(),
            'principal' => $principal,
            'stats' => [
                'total_students' => SchoolProfile::sum('total_students') ?: 0,
                'total_teachers' => Teacher::count(),
                'total_achievements' => Achievement::count(),
            ],
        ]);
    }

    /**
     * Display the school profile page.
     */
    public function profile()
    {
        // 🔥 DETEKSI KEPALA SEKOLAH DARI POSITION
        $allTeachers = Teacher::all();
        $kepsek = $allTeachers->first(fn($t) =>
            $t->role === 'principal' || stripos($t->position, 'kepala') !== false
        );

        $guruKelas = $allTeachers->filter(fn($t) =>
            $t->id !== ($kepsek?->id) && $t->role === 'teacher'
        );

        $staff = $allTeachers->filter(fn($t) => $t->role === 'staff');

        return Inertia::render('public/profile', [
            'schoolProfile' => SchoolProfile::first(),
            'visionMission' => VisionMission::first(),
            'principal' => $kepsek,
            'teachers' => $guruKelas->values(),
            'staff' => $staff->values(),
            'timelines' => \App\Models\SchoolTimeline::orderBy('order')->orderByDesc('year')->get(),
        ]);
    }

    /**
     * Display the academic page.
     */
    public function academic()
    {
        $facilities = \App\Models\Facility::all()->map(function ($facility) {
            $facility->category = strtolower($facility->category ?? 'umum');
            return $facility;
        })->values();

        return Inertia::render('public/academic', [
            'academicContents' => \App\Models\AcademicContent::all(),
            'programs' => \App\Models\Program::all(),
            'extracurriculars' => \App\Models\Extracurricular::all(),
            'facilities' => $facilities,
        ]);
    }

    /**
     * Display the students page.
     */
    public function students()
    {
        $profile = \App\Models\SchoolProfile::first();

        // Force refresh from database
        $profile->refresh();

        $stats = [
            'total_students' => (int) ($profile->total_students ?? 0),
            'male_students' => (int) ($profile->male_students ?? 0),
            'female_students' => (int) ($profile->female_students ?? 0),
            'total_classes' => \App\Models\ClassDistribution::count(),
        ];

        \Log::info('DEBUG students page - Raw profile:', $profile->getAttributes());
        \Log::info('DEBUG students page - Stats being sent:', $stats);

        return Inertia::render('public/students', [
            'classDistributions' => \App\Models\ClassDistribution::all(),
            'stats' => $stats,
            'studentAchievements' => \App\Models\Achievement::latest()->take(3)->get(),
        ]);
    }

    /**
     * Display the classrooms page.
     */
    public function classrooms()
    {
        $facilities = Facility::all()->map(function ($facility) {
            $facility->category = strtolower($facility->category ?? 'umum');
            return $facility;
        })->sortBy([
            [fn ($a, $b) => $this->categoryOrder($a->category) - $this->categoryOrder($b->category)],
            [fn ($a, $b) => $this->extractNumber($a->name) - $this->extractNumber($b->name)],
        ])->values();

        $roomFacilities = collect();
        try {
            $roomFacilities = \App\Models\RoomFacility::where('is_active', true)
                ->orderBy('order')
                ->orderBy('id')
                ->get()
                ->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'name' => $item->name,
                        'icon_key' => $item->icon_key,
                        'description' => $item->description,
                        'order' => $item->order,
                        'is_active' => $item->is_active,
                    ];
                });
            
            \Log::info('RoomFacilities data: ' . $roomFacilities->toJson());
        } catch (\Exception $e) {
            \Log::error('RoomFacilities ERROR: ' . $e->getMessage());
            \Log::error('Stack: ' . $e->getTraceAsString());
        }

        return Inertia::render('public/classrooms', [
            'facilities' => $facilities,
            'roomFacilities' => $roomFacilities,
        ]);
    }

    /**
     * Get category order for sorting.
     */
    private function categoryOrder(string $category): int
    {
        return match ($category) {
            'umum' => 1,
            'akademik' => 2,
            'kelas' => 3,
            default => 99,
        };
    }

    /**
     * Extract number from string for sorting.
     */
    private function extractNumber(string $name): int
    {
        preg_match('/(\d+)/', $name, $matches);
        return $matches ? (int) $matches[0] : 999;
    }

    /**
     * Display the PPDB page.
     */
    public function ppdb()
    {
        return Inertia::render('public/ppdb');
    }
}
