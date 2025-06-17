<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreServiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'icon' => ['nullable', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'],
            'is_active' => ['boolean'],
            'sort_order' => ['integer', 'min:0'],
            'meta_data' => ['nullable', 'array'],
            'attributes' => ['nullable', 'array'],
            'attributes.*.name' => ['required_with:attributes.*.value', 'string', 'max:255'],
            'attributes.*.value' => ['required_with:attributes.*.name', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'The service name is required.',
            'name.max' => 'The service name must not exceed 255 characters.',
            'description.required' => 'The service description is required.',
            'image.image' => 'The file must be an image.',
            'image.mimes' => 'The image must be a file of type: jpeg, png, jpg, gif.',
            'image.max' => 'The image must not be larger than 2MB.',
            'sort_order.min' => 'The sort order must be at least 0.',
            'attributes.*.name.required_with' => 'Attribute name is required when value is provided.',
            'attributes.*.value.required_with' => 'Attribute value is required when name is provided.',
        ];
    }
}