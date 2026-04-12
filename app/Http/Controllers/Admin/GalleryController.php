<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GalleryController extends Controller
{
    public function index()
    {
        $galleries = Gallery::latest()->paginate(12)->withQueryString();

        return Inertia::render('admin/galleries', [
            'galleries' => $galleries,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,webp|max:5120',
        ]);

        $validated['image'] = $request->file('image')->store('galleries', 'public');

        Gallery::create($validated);

        return back()->with('success', 'Gallery image uploaded successfully');
    }

    public function update(Request $request, Gallery $gallery)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
        ]);

        $gallery->update($validated);

        return back()->with('success', 'Gallery updated successfully');
    }

    public function destroy(Gallery $gallery)
    {
        if ($gallery->image) {
            Storage::disk('public')->delete($gallery->image);
        }

        $gallery->delete();

        return back()->with('success', 'Gallery image deleted successfully');
    }
}
