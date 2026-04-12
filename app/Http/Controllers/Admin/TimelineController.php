<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SchoolTimeline;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TimelineController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/timelines', [
            'timelines' => SchoolTimeline::orderBy('order')->orderByDesc('year')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'year' => 'required|string|max:10',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'order' => 'nullable|integer',
        ]);

        SchoolTimeline::create($request->all());

        return back()->with('success', 'Timeline berhasil ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $timeline = SchoolTimeline::findOrFail($id);

        $request->validate([
            'year' => 'required|string|max:10',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'order' => 'nullable|integer',
        ]);

        $timeline->update($request->all());

        return back()->with('success', 'Timeline berhasil diupdate');
    }

    public function destroy($id)
    {
        SchoolTimeline::destroy($id);

        return back()->with('success', 'Timeline berhasil dihapus');
    }
}
