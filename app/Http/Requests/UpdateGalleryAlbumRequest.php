<?php

namespace App\Http\Requests;

class UpdateGalleryAlbumRequest extends StoreGalleryAlbumRequest
{
    /**
     * @return array<string, array<int, string>>
     */
    public function rules(): array
    {
        return [
            ...parent::rules(),
            'remove_photo_ids' => ['nullable', 'array'],
            'remove_photo_ids.*' => ['integer'],
        ];
    }
}
