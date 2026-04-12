<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AcademicContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AcademicContentController extends Controller
{
    public function index()
    {
        $contents = AcademicContent::latest()->get();
        return Inertia::render('admin/academic-contents', [
            'academicContents' => $contents,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|in:kurikulum,lainnya',
            'image' => 'nullable|image|max:5120',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('academic', 'public');
        }

        AcademicContent::create($data);
        return back()->with('success', 'Konten akademik berhasil ditambahkan');
    }

    public function update(Request $request, AcademicContent $content)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|in:kurikulum,lainnya',
            'image' => 'nullable|image|max:5120',
        ]);

        if ($request->hasFile('image')) {
            if ($content->image) {
                Storage::disk('public')->delete($content->image);
            }
            $data['image'] = $request->file('image')->store('academic', 'public');
        }

        $content->update($data);
        return back()->with('success', 'Konten akademik berhasil diupdate');
    }

    public function destroy(AcademicContent $content)
    {
        if ($content->image) {
            Storage::disk('public')->delete($content->image);
        }
        $content->delete();
        return back()->with('success', 'Konten akademik berhasil dihapus');
    }
}
