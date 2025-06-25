<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBodCommitteeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'chairman_board_id' => 'nullable|exists:board_of_directors,id',
            'secretary_board_id' => 'nullable|exists:board_of_directors,id',
            'secretary_management_id' => 'nullable|exists:managements,id',
            'board_members' => 'nullable|array',
            'board_members.*' => 'exists:board_of_directors,id',
            'management_members' => 'nullable|array',
            'management_members.*' => 'exists:managements,id',
            'is_active' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'The committee name is required.',
            'chairman_board_id.exists' => 'The selected chairman does not exist.',
            'secretary_board_id.exists' => 'The selected secretary does not exist.',
            'secretary_management_id.exists' => 'The selected secretary does not exist.',
            'board_members.*.exists' => 'One or more selected board members do not exist.',
            'management_members.*.exists' => 'One or more selected management members do not exist.',
        ];
    }

    protected function prepareForValidation()
    {
        // Ensure only one secretary is selected
        if ($this->secretary_board_id && $this->secretary_management_id) {
            $this->merge(['secretary_management_id' => null]);
        }
    }
}
