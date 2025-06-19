<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateScheduleOfChargeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'from' => 'required|date',
            'to' => 'nullable|date|after_or_equal:from',
            'attachment' => 'nullable|file|mimes:pdf,doc,docx,xls,xlsx|max:10240',
            'description' => 'nullable|string|max:1000',
            'is_active' => 'boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'The title is required.',
            'from.required' => 'The start date is required.',
            'to.after_or_equal' => 'The end date must be after or equal to the start date.',
            'attachment.mimes' => 'The attachment must be a PDF, Word document, or Excel file.',
            'attachment.max' => 'The attachment size cannot exceed 10MB.',
        ];
    }
}