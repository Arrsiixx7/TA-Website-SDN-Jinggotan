<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Facility;
use App\Models\RoomFacility;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class FacilityController extends Controller
{
    public function index()
    {
        $facilities = Facility::orderBy('category')->orderBy('name')->get();
        
        $roomFacilities = collect();
        try {
            $roomFacilities = \App\Models\RoomFacility::orderBy('order')->orderBy('id')->get();
        } catch (\Exception $e) {
            // Table might not exist yet
        }

        return Inertia::render('admin/facilities', [
            'facilities' => $facilities,
            'roomFacilities' => $roomFacilities,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        Facility::create($validated);

        return back()->with('success', 'Facility created successfully');
    }

    public function update(Request $request, Facility $facility)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        if ($request->filled('name')) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $facility->update($validated);

        return back()->with('success', 'Facility updated successfully');
    }

    public function destroy(Facility $facility)
    {
        $facility->delete();

        return back()->with('success', 'Facility deleted successfully');
    }

    // Room Facility CRUD
    public function storeRoom(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'icon_key' => 'nullable|string|max:50',
            'description' => 'nullable|string',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        RoomFacility::create($validated);

        return back()->with('success', 'Fasilitas ruangan berhasil ditambahkan');
    }

    public function updateRoom(Request $request, RoomFacility $roomFacility)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'icon_key' => 'nullable|string|max:50',
            'description' => 'nullable|string',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        $roomFacility->update($validated);

        return back()->with('success', 'Fasilitas ruangan berhasil diupdate');
    }

    public function destroyRoom(RoomFacility $roomFacility)
    {
        $roomFacility->delete();

        return back()->with('success', 'Fasilitas ruangan berhasil dihapus');
    }
}
