<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBankServiceRequest extends FormRequest
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
            'icon' => ['required', 'string', 'max:255'],
            'products' => ['required_unless:service_type,stat', 'array'],
            'products.*' => ['required_unless:service_type,stat', 'string', 'max:255'],
            'cta_text' => ['required_unless:service_type,stat', 'string', 'max:255'],
            'cta_link' => ['required_unless:service_type,stat', 'string', 'max:255'],
            'color' => ['required', 'string', 'max:255'],
            'benefits' => ['required', 'array', 'min:1'],
            'benefits.*' => ['required', 'string', 'max:255'],
            'order' => ['nullable', 'integer', 'min:0'],
            'status' => ['required', 'boolean'],
            'service_type' => ['required', 'in:service,deposit,stat'],
            'stat_number' => ['nullable', 'string', 'max:255', 'required_if:service_type,stat'],
            'stat_label' => ['nullable', 'string', 'max:255', 'required_if:service_type,stat'],
            'stat_description' => ['nullable', 'string', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'The title field is required.',
            'description.required' => 'The description field is required.',
            'icon.required' => 'The icon field is required.',
            'products.required' => 'At least one product is required.',
            'products.*.required' => 'Product name cannot be empty.',
            'cta_text.required' => 'The call-to-action text is required.',
            'cta_link.required' => 'The call-to-action link is required.',
            'color.required' => 'The color field is required.',
            'benefits.required' => 'At least one benefit is required.',
            'benefits.*.required' => 'Benefit text cannot be empty.',
            'status.required' => 'The status field is required.',
            'service_type.required' => 'The service type field is required.',
            'service_type.in' => 'The service type must be one of: service, deposit, stat.',
            'stat_number.required_if' => 'The stat number is required when service type is stat.',
            'stat_label.required_if' => 'The stat label is required when service type is stat.',
        ];
    }
}
