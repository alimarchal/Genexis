<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateNewsAnnouncementRequest extends FormRequest
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
        $newsAnnouncementId = $this->route('news_announcement')?->id;

        return [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'published_date' => 'required|date',
            'is_featured' => 'boolean',
            'category' => 'required|string|in:general,banking,services,announcements,updates',
            'slug' => 'nullable|string|unique:news_announcements,slug,'.$newsAnnouncementId,
            'is_published' => 'boolean',
        ];
    }
}
