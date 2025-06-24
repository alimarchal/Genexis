<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTopNavbarMessageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'type' => 'required|string|max:255',
            'priority' => 'required|in:low,medium,high,urgent',
            'icon' => 'required|string|max:10',
            'text' => 'required|string',
            'color' => 'required|string|max:255',
            'bg_color' => 'required|string|max:255',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
        ];
    }
}
