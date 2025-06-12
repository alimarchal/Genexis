<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCareerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'requirements' => ['required', 'string'],
            'location' => ['required', 'string', 'max:255'],
            'document' => ['nullable', 'file', 'mimes:pdf', 'max:10240'], // 10MB
            'closing_date' => ['nullable', 'date', 'after:today'],
            'benefits' => ['nullable', 'string'],
            'is_featured' => ['boolean'],
            'is_active' => ['boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Job title is required.',
            'description.required' => 'Job description is required.',
            'requirements.required' => 'Job requirements are required.',
            'location.required' => 'Job location is required.',
            'document.mimes' => 'Document must be a PDF file.',
            'document.max' => 'Document size cannot exceed 10MB.',
            'closing_date.after' => 'Closing date must be a future date.',
        ];
    }
}
