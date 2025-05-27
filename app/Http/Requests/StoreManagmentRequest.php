<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreManagmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['nullable', 'string', 'max:255'],
            'full_name' => ['required', 'string', 'max:255'],
            'designation' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'attachment' => ['nullable', 'file', 'mimes:jpg,jpeg,png,pdf', 'max:2048'],
            'order' => ['nullable', 'integer', 'min:0'],
            'status' => ['required', 'in:active,inactive'],
        ];
    }

    public function messages(): array
    {
        return [
            'full_name.required' => 'The full name field is required.',
            'designation.required' => 'The designation field is required.',
            'status.required' => 'The status field is required.',
            'status.in' => 'The status must be either active or inactive.',
            'attachment.mimes' => 'The attachment must be a file of type: jpg, jpeg, png, pdf.',
            'attachment.max' => 'The attachment may not be greater than 2MB.',
        ];
    }
}