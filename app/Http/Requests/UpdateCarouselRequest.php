<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCarouselRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'file', 'mimes:jpg,jpeg,png', 'max:307200'],
            'button_text' => ['nullable', 'string', 'max:255'],
            'button_url' => ['nullable', 'string', 'max:255'],
            'order' => ['nullable', 'integer', 'min:0'],
            'status' => ['required', 'in:active,inactive'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'The title field is required.',
            'image.mimes' => 'The image must be a file of type: jpg, jpeg, png.',
            'image.max' => 'The image may not be greater than 300MB.',
            'status.required' => 'The status field is required.',
            'status.in' => 'The status must be either active or inactive.',
        ];
    }
}
