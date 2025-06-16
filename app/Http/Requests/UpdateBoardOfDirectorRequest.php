<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBoardOfDirectorRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'nullable|string|in:none,Mr.,Ms.,Mrs.,Dr.,Prof.',
            'full_name' => 'required|string|max:255',
            'designation' => 'required|string|max:255',
            'short_description' => 'nullable|string|max:1000',
            'full_biography' => 'nullable|string',
            'experience' => 'nullable|array',
            'experience.*' => 'nullable|string|max:500',
            'achievements' => 'nullable|array',
            'achievements.*' => 'nullable|string|max:500',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
            'is_chairman' => 'boolean',
        ];
    }

    protected function prepareForValidation()
    {
        if ($this->title === 'none') {
            $this->merge(['title' => null]);
        }
    }

    public function messages(): array
    {
        return [
            'full_name.required' => 'The full name field is required.',
            'designation.required' => 'The designation field is required.',
            'image.image' => 'The uploaded file must be an image.',
            'image.max' => 'The image size should not exceed 2MB.',
            'experience.*.max' => 'Each experience item should not exceed 500 characters.',
            'achievements.*.max' => 'Each achievement item should not exceed 500 characters.',
        ];
    }
}