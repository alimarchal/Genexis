<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreDownloadRequest extends FormRequest
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'file_upload_id' => ['nullable', 'uuid'],
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:5000',
            'file' => 'required_without:file_upload_id|nullable|file|mimes:pdf,doc,docx,xls,xlsx,jpg,jpeg,png,gif,zip,rar|max:51200', // 50MB when posted directly
            'category' => 'required|string|in:general,Document,picture,form,forms,reports',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'The title field is required.',
            'title.max' => 'The title may not be greater than 255 characters.',
            'file.required_without' => 'Please upload a file.',
            'file.mimes' => 'The file must be a PDF, Word document, Excel file, image, or archive file.',
            'file.max' => 'The file size may not be greater than 50MB when posted directly (use the large-file uploader).',
            'category.required' => 'Please select a category.',
            'category.in' => 'The selected category is invalid.',
            'description.max' => 'The description may not be greater than 5000 characters.',
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'file' => 'upload file',
            'is_featured' => 'featured status',
            'is_active' => 'active status',
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'is_featured' => $this->boolean('is_featured'),
            'is_active' => $this->boolean('is_active', true),
        ]);
    }
}
