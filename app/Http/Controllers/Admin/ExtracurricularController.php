<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Extracurricular;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ExtracurricularController extends Controller
{
    public function index()
    {
        $extracurriculars = Extracurricular::latest()->get();
        return Inertia::render('admin/extracurriculars', [
            'extracurriculars' => $extracurriculars,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:5120',
        ]);

        $data['slug'] = Str::slug($data['name']);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('extracurriculars', 'public');
        }

        Extracurricular::create($data);
        return back()->with('success', 'Ekstrakurikuler berhasil ditambahkan');
    }

    public function update(Request $request, Extracurricular $extracurricular)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:5120',
        ]);

        $data['slug'] = Str::slug($data['name']);

        if ($request->hasFile('image')) {
            if ($extracurricular->image) {
                Storage::disk('public')->delete($extracurricular->image);
            }
            $data['image'] = $request->file('image')->store('extracurriculars', 'public');
        }

        $extracurricular->update($data);
        return back()->with('success', 'Ekstrakurikuler berhasil diupdate');
    }

    public function destroy(Extracurricular $extracurricular)
    {
        if ($extracurricular->image) {
            Storage::disk('public')->delete($extracurricular->image);
        }
        $extracurricular->delete();
        return back()->with('success', 'Ekstrakurikuler berhasil dihapus');
    }
}
