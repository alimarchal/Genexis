<?php

namespace App\Models;

use App\Traits\UserTracking;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceAttribute extends Model
{
    use HasFactory, UserTracking;

    protected $fillable = [
        'service_id',
        'attribute_name',
        'attribute_value',
        'sort_order',
    ];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}
