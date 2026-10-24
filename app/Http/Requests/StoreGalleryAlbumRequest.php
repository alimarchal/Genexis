<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreGalleryAlbumRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, array<int, string>>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'cover_image' => ['nullable', 'file', 'mimes:jpg,jpeg,png', 'max:10240'],
            'order' => ['nullable', 'integer', 'min:0'],
            'status' => ['required', 'in:active,inactive'],
            'photos' => ['nullable', 'array', 'max:50'],
            'photos.*' => ['file', 'mimes:jpg,jpeg,png', 'max:10240'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'The title field is required.',
            'cover_image.mimes' => 'The cover image must be a file of type: jpg, jpeg, png.',
            'cover_image.max' => 'The cover image may not be greater than 10MB.',
            'photos.max' => 'You can upload at most 50 photos at a time.',
            'photos.*.mimes' => 'Each photo must be a file of type: jpg, jpeg, png.',
            'photos.*.max' => 'Each photo may not be greater than 10MB.',
            'status.required' => 'The status field is required.',
            'status.in' => 'The status must be either active or inactive.',
        ];
    }
}
