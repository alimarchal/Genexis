<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBranchRequest extends FormRequest
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
            'region_id' => 'required|exists:regions,id',
            'district_id' => 'required|exists:districts,id',
            'code' => 'required|string|max:255|unique:branches,code',
            'type' => 'required|in:main_branch,sub_branch,atm,service_center,mobile_unit',
            'facilities' => 'nullable|string',
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'map_url' => 'nullable|url',
            'map_icon' => 'nullable|string|max:255',
            'map_color' => 'nullable|string|max:7',
            'map_priority' => 'nullable|integer|min:0',
            'show_on_map' => 'boolean',
            'popup_image' => 'nullable|string|max:255',
            'directions' => 'nullable|string',
            'operating_hours' => 'nullable|json',
            'is_24_hours' => 'boolean',
            'holidays' => 'nullable|json',
            'status' => 'required|in:active,inactive',
        ];
    }
}
