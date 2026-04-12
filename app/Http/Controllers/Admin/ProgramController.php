<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProgramController extends Controller
{
    public function index()
    {
        $programs = Program::orderBy('order')->get();
        return Inertia::render('admin/programs', [
            'programs' => $programs,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'order' => 'nullable|integer',
            'image' => 'nullable|image|max:5120',
        ]);

        $data['slug'] = Str::slug($data['title']);
        $data['order'] = $data['order'] ?? 0;

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('programs', 'public');
        }

        Program::create($data);
        return back()->with('success', 'Program berhasil ditambahkan');
    }

    public function update(Request $request, Program $program)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'order' => 'nullable|integer',
            'image' => 'nullable|image|max:5120',
        ]);

        $data['slug'] = Str::slug($data['title']);
        $data['order'] = $data['order'] ?? 0;

        if ($request->hasFile('image')) {
            if ($program->image) {
                Storage::disk('public')->delete($program->image);
            }
            $data['image'] = $request->file('image')->store('programs', 'public');
        }

        $program->update($data);
        return back()->with('success', 'Program berhasil diupdate');
    }

    public function destroy(Program $program)
    {
        if ($program->image) {
            Storage::disk('public')->delete($program->image);
        }
        $program->delete();
        return back()->with('success', 'Program berhasil dihapus');
    }
}
