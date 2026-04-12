<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTeacherRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'role' => 'required|in:principal,teacher,staff',
            'position' => 'nullable|string|max:255',
            'class' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,webp|max:2048',
        ];
    }
}
