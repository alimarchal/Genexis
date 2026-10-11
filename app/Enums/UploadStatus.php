<?php

namespace App\Enums;

enum UploadStatus: string
{
    case Uploading = 'uploading';
    case Completed = 'completed';
    case Cancelled = 'cancelled';
    case Expired = 'expired';
    case Failed = 'failed';
}
