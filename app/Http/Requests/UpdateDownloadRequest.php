<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDownloadRequest extends FormRequest
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
            'file' => ['nullable', 'file', 'mimes:pdf,doc,docx,xls,xlsx,ppt,pptx,jpg,jpeg,png,zip,rar', 'max:51200'], // 50MB
            'category' => ['required', 'string', 'in:forms,reports,brochures,policies,general'],
            'is_featured' => ['boolean'],
            'is_active' => ['boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Title is required.',
            'file.mimes' => 'File must be a valid document, image, or archive file.',
            'file.max' => 'File size cannot exceed 50MB.',
            'category.required' => 'Category is required.',
            'category.in' => 'Invalid category selected.',
        ];
    }
}
