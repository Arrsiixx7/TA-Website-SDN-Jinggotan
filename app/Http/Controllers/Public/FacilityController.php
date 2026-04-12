<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Facility;
use Inertia\Inertia;

class FacilityController extends Controller
{
    /**
     * Display a specific facility.
     */
    public function show(string $slug)
    {
        $facility = Facility::where('slug', $slug)->firstOrFail();

        return Inertia::render('public/facility-detail', [
            'facility' => $facility,
        ]);
    }
}
