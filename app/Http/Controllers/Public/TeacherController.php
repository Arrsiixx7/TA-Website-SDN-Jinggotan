<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Teacher;
use Inertia\Inertia;

class TeacherController extends Controller
{
    /**
     * Display all teachers.
     */
    public function index()
    {
        // 🔥 DETEKSI KEPALA SEKOLAH DARI POSITION (karena role bisa 'teacher')
        $allTeachers = Teacher::all();

        $kepsek = $allTeachers->first(fn($t) =>
            $t->role === 'principal' || stripos($t->position, 'kepala') !== false
        );

        $guruKelas = $allTeachers->filter(fn($t) =>
            $t->id !== ($kepsek?->id) && $t->role === 'teacher'
        );

        $staff = $allTeachers->filter(fn($t) => $t->role === 'staff');

        return Inertia::render('public/teachers', [
            'principal' => $kepsek ? [$kepsek] : [],
            'teachers' => $guruKelas->values(),
            'staff' => $staff->values(),
        ]);
    }

    /**
     * Display a specific teacher.
     */
    public function show($id)
    {
        $teacher = Teacher::findOrFail($id);

        return Inertia::render('public/teacher-detail', [
            'teacher' => $teacher,
        ]);
    }
}
