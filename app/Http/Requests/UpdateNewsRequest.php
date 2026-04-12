<?php
namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;

class UpdateNewsRequest extends FormRequest {
    public function authorize(): bool { return true; }
    public function rules(): array {
        return ['title' => 'required|string|max:255', 'content' => 'required|string', 'image' => 'nullable|image|mimes:jpeg,png,webp|max:5120'];
    }
}
class StoreAchievementRequest extends FormRequest {
    public function authorize(): bool { return true; }
    public function rules(): array {
        return ['title' => 'required|string|max:255', 'description' => 'required|string', 'category' => 'required|in:Akademik,Non Akademik', 'image' => 'nullable|image|mimes:jpeg,png,webp|max:5120'];
    }
}
class StoreMessageRequest extends FormRequest {
    public function authorize(): bool { return true; }
    public function rules(): array {
        return ['name' => 'required|string|max:255', 'email' => 'required|email|max:255', 'message' => 'required|string'];
    }
}
class StoreFacilityRequest extends FormRequest {
    public function authorize(): bool { return true; }
    public function rules(): array {
        return ['name' => 'required|string|max:255', 'category' => 'required|string|max:255', 'description' => 'nullable|string'];
    }
}
class UpdateSchoolProfileRequest extends FormRequest {
    public function authorize(): bool { return true; }
    public function rules(): array {
        return [
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
        ];
    }
}
