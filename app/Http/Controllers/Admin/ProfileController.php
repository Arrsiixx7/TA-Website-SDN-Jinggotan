<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SchoolProfile;
use App\Models\VisionMission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function edit()
    {
        return Inertia::render('admin/profile', [
            'schoolProfile' => SchoolProfile::first(),
            'visionMission' => VisionMission::first(),
        ]);
    }

    public function update(Request $request)
    {
        $profile = SchoolProfile::first();

        if (!$profile) {
            $profile = SchoolProfile::create($request->all());
            return back()->with('success', 'School profile created successfully');
        }

        $validated = $request->validate([
            'principal_name' => 'required|string|max:255',
            'principal_message' => 'required|string',
            'total_students' => 'required|integer',
            'total_teachers' => 'required|integer',
            'total_classes' => 'required|integer',
            'total_achievements' => 'required|integer',
            'name' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'address' => 'nullable|string',
            'logo' => 'nullable|image|mimes:jpeg,png,webp|max:2048',
            'principal_photo' => 'nullable|image|mimes:jpeg,png,webp|max:2048',
            'male_students' => 'nullable|integer',
            'female_students' => 'nullable|integer',
        ]);

        if ($request->hasFile('logo')) {
            if ($profile->logo) {
                Storage::disk('public')->delete($profile->logo);
            }
            $validated['logo'] = $request->file('logo')->store('profiles', 'public');
        }

        if ($request->hasFile('principal_photo')) {
            if ($profile->principal_photo) {
                Storage::disk('public')->delete($profile->principal_photo);
            }
            $validated['principal_photo'] = $request->file('principal_photo')->store('profiles', 'public');
        }

        $profile->update($validated);

        return back()->with('success', 'School profile updated successfully');
    }

    public function updateVisionMission(Request $request)
    {
        $visionMission = VisionMission::first();

        $validated = $request->validate([
            'vision' => 'required|string',
            'mission' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($visionMission && $visionMission->image) {
                Storage::disk('public')->delete($visionMission->image);
            }
            $validated['image'] = $request->file('image')->store('vision-missions', 'public');
        }

        if (!$visionMission) {
            VisionMission::create($validated);
            return back()->with('success', 'Vision & Mission created successfully');
        }

        $visionMission->update($validated);

        return back()->with('success', 'Vision & Mission updated successfully');
    }
}
