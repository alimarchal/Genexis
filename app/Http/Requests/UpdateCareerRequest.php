<?php

namespace App\Http\Requests;

use App\Models\Career;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Carbon;
use Illuminate\Validation\Rule;
use Throwable;

class UpdateCareerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'document_upload_id' => ['nullable', 'uuid'],
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:5000',
            'requirements' => 'required|string|max:5000',
            'location' => 'required|string|max:255',
            'document' => 'nullable|file|mimes:pdf,doc,docx|max:51200',
            'closing_date' => ['nullable', 'date', Rule::when($this->isChangingClosingDate(), 'after_or_equal:today')],
            'is_active' => 'required|in:0,1', // Accept string values
            'is_featured' => 'required|in:0,1', // Accept string values
            'benefits' => 'nullable|string|max:3000',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'The job title is required.',
            'description.required' => 'The job description is required.',
            'requirements.required' => 'The job requirements are required.',
            'location.required' => 'The job location is required.',
            'closing_date.after_or_equal' => 'The closing date must be today or a future date.',
            'document.mimes' => 'The document must be a PDF or Word file.',
            'document.max' => 'The document size cannot exceed 50MB when posted directly (use the large-file uploader).',
        ];
    }

    /**
     * An expired posting must stay editable, so the date only has to be in the future when it is being changed.
     */
    private function isChangingClosingDate(): bool
    {
        $submitted = $this->input('closing_date');

        if (blank($submitted)) {
            return false;
        }

        $career = $this->route('career');
        $current = $career instanceof Career ? $career->closing_date?->toDateString() : null;

        try {
            return Carbon::parse($submitted)->toDateString() !== $current;
        } catch (Throwable) {
            return true;
        }
    }
}
