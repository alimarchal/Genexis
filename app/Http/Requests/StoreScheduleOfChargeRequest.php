<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreScheduleOfChargeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'from' => ['required', 'date'],
            'to' => ['nullable', 'date', 'after_or_equal:from'],
            'attachment' => ['nullable', 'file', 'mimes:pdf,jpg,jpeg,png', 'max:20480'], // 20MB
            'description' => ['nullable', 'string'],
            'is_active' => ['boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Title is required.',
            'from.required' => 'Start date is required.',
            'to.after_or_equal' => 'End date must be after or equal to start date.',
            'attachment.mimes' => 'Attachment must be a PDF, JPG, JPEG, or PNG file.',
            'attachment.max' => 'Attachment size cannot exceed 20MB.',
        ];
    }
}
