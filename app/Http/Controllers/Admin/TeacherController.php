<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class TeacherController extends Controller
{
    public function index()
    {
        $teachers = Teacher::orderBy('role')
            ->orderBy('name')
            ->get();

        return Inertia::render('admin/teachers', [
            'teachers' => $teachers,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|in:principal,teacher,staff',
            'position' => 'nullable|string|max:255',
            'class' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('teachers', 'public');
        }

        Teacher::create($validated);

        return back()->with('success', 'Teacher created successfully');
    }

    public function update(Request $request, Teacher $teacher)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|in:principal,teacher,staff',
            'position' => 'nullable|string|max:255',
            'class' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($teacher->image) {
                Storage::disk('public')->delete($teacher->image);
            }
            $validated['image'] = $request->file('image')->store('teachers', 'public');
        }

        $teacher->update($validated);

        return back()->with('success', 'Teacher updated successfully');
    }

    public function destroy(Teacher $teacher)
    {
        if ($teacher->image) {
            Storage::disk('public')->delete($teacher->image);
        }

        $teacher->delete();

        return back()->with('success', 'Teacher deleted successfully');
    }
}
