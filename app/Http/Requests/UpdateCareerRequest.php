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
        'title' => 'required|string|max:255',
        'description' => 'required|string|max:5000',
        'requirements' => 'required|string|max:5000',
        'location' => 'required|string|max:255',
        'document' => 'nullable|file|mimes:pdf,doc,docx|max:307200',
        'closing_date' => 'nullable|date|after_or_equal:today',
        'is_active' => 'required|in:0,1', // Accept string values
        'is_featured' => 'required|in:0,1', // Accept string values
        'benefits' => 'nullable|string|max:3000',
    ];
}

    public function messages(): array
    {
        return [
            'title.required' => 'The job title is required.',
            'description.required' => 'The job description is required.',
            'requirements.required' => 'The job requirements are required.',
            'location.required' => 'The job location is required.',
            'closing_date.after_or_equal' => 'The closing date must be today or a future date.',
            'document.mimes' => 'The document must be a PDF or Word file.',
            'document.max' => 'The document size cannot exceed 300MB.',
        ];
    }
}