<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\RoomFacility;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoomFacilityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $facilities = RoomFacility::orderBy('order')->orderBy('id')->get();

        return Inertia::render('admin/room-facilities/Index', [
            'facilities' => $facilities,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'icon_key' => 'nullable|string|max:50',
            'description' => 'nullable|string',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        RoomFacility::create($validated);

        return redirect()->route('admin.room-facilities.index')
            ->with('success', 'Fasilitas ruangan berhasil ditambahkan.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RoomFacility $roomFacility)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'icon_key' => 'nullable|string|max:50',
            'description' => 'nullable|string',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        $roomFacility->update($validated);

        return redirect()->route('admin.room-facilities.index')
            ->with('success', 'Fasilitas ruangan berhasil diupdate.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RoomFacility $roomFacility)
    {
        $roomFacility->delete();

        return redirect()->route('admin.room-facilities.index')
            ->with('success', 'Fasilitas ruangan berhasil dihapus.');
    }
}
