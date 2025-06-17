<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateServiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $serviceId = $this->route('service')->id;

        return [
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', Rule::unique('services', 'slug')->ignore($serviceId)],
            'description' => ['required', 'string'],
            'icon' => ['nullable', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'],
            'is_active' => ['boolean'],
            'sort_order' => ['integer', 'min:0'],
            'meta_data' => ['nullable', 'array'],
            'attributes' => ['nullable', 'array'],
            'attributes.*.attribute_name' => ['required_with:attributes.*.attribute_value', 'string', 'max:255'],
            'attributes.*.attribute_value' => ['required_with:attributes.*.attribute_name', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'The service name is required.',
            'name.max' => 'The service name may not be greater than 255 characters.',
            'slug.unique' => 'This slug is already taken.',
            'description.required' => 'The service description is required.',
            'image.image' => 'The file must be an image.',
            'image.mimes' => 'The image must be a file of type: jpeg, png, jpg, gif.',
            'image.max' => 'The image may not be greater than 2MB.',
            'sort_order.integer' => 'The sort order must be a number.',
            'sort_order.min' => 'The sort order must be at least 0.',
            'attributes.*.attribute_name.required_with' => 'Attribute name is required when attribute value is provided.',
            'attributes.*.attribute_value.required_with' => 'Attribute value is required when attribute name is provided.',
        ];
    }

    protected function prepareForValidation(): void
    {
        if ($this->has('attributes')) {
            $attributes = collect($this->attributes)
                ->filter(function ($attribute) {
                    return !empty(trim($attribute['attribute_name'] ?? '')) ||
                        !empty(trim($attribute['attribute_value'] ?? ''));
                })
                ->values()
                ->toArray();

            $this->merge([
                'attributes' => $attributes,
            ]);
        }
    }
}