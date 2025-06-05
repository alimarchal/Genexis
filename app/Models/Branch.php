<?php

namespace App\Models;

use App\Traits\UserTracking;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\QueryBuilder\AllowedFilter;

class Branch extends Model
{
    /** @use HasFactory<\Database\Factories\BranchFactory> */
    use HasFactory, UserTracking;

    protected $fillable = [
        'region_id',
        'district_id',
        'code',
        'type',
        'facilities',
        'name',
        'address',
        'status',
        'latitude',
        'longitude',
        'map_url',
        'directions',
        'operating_hours',
        'is_24_hours',
        'holidays',
        'map_icon',
        'map_color',
        'map_priority',
        'show_on_map',
        'popup_image',
    ];

    protected $casts = [
        'status' => 'string',
        'type' => 'string',
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'operating_hours' => 'array',
        'is_24_hours' => 'boolean',
        'holidays' => 'array',
        'show_on_map' => 'boolean',
        'map_priority' => 'integer',
    ];

    public function region(): BelongsTo
    {
        return $this->belongsTo(Region::class);
    }

    public function district(): BelongsTo
    {
        return $this->belongsTo(District::class);
    }

    public function contacts(): HasMany
    {
        return $this->hasMany(Contact::class);
    }

    public function branchServices(): HasMany
    {
        return $this->hasMany(BranchService::class);
    }

    public function services(): HasMany
    {
        return $this->hasMany(BranchService::class);
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeWithCoordinates($query)
    {
        return $query->whereNotNull(['latitude', 'longitude']);
    }

    public function getFullAddressAttribute(): string
    {
        return "{$this->address}, {$this->district->name}, {$this->region->name}";
    }

    public function getGoogleMapsUrlAttribute(): string
    {
        if ($this->latitude && $this->longitude) {
            return "https://www.google.com/maps?q={$this->latitude},{$this->longitude}";
        }

        return '';
    }

    public function getDistanceFrom(float $lat, float $lng): float
    {
        if (! $this->latitude || ! $this->longitude) {
            return 0;
        }

        $earthRadius = 6371; // km
        $dLat = deg2rad($this->latitude - $lat);
        $dLng = deg2rad($this->longitude - $lng);

        $a = sin($dLat / 2) * sin($dLat / 2) +
             cos(deg2rad($lat)) * cos(deg2rad($this->latitude)) *
             sin($dLng / 2) * sin($dLng / 2);

        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

        return $earthRadius * $c;
    }

    public function scopeForMap($query)
    {
        return $query->where('show_on_map', true)
            ->whereNotNull(['latitude', 'longitude'])
            ->orderBy('map_priority', 'desc');
    }

    public function scopeByType($query, string $type)
    {
        return $query->where('type', $type);
    }

    public function scopeOpen($query)
    {
        if ($this->is_24_hours) {
            return $query;
        }

        $now = now()->format('H:i');
        $today = strtolower(now()->format('l'));

        return $query->whereJsonContains("operating_hours->{$today}", $now);
    }

    public function getIsOpenAttribute(): bool
    {
        if ($this->is_24_hours) {
            return true;
        }

        if (! $this->operating_hours || ! isset($this->operating_hours[strtolower(now()->format('l'))])) {
            return false;
        }

        $todayHours = $this->operating_hours[strtolower(now()->format('l'))];
        if (! $todayHours) {
            return false; // Closed on this day
        }

        $now = now()->format('H:i');
        $today = strtolower(now()->format('l'));

        // Handle special Friday format with morning and afternoon sessions
        if ($today === 'friday' && is_array($todayHours) && isset($todayHours['morning'])) {
            $morningStart = $todayHours['morning'][0];
            $morningEnd = $todayHours['morning'][1];
            $afternoonStart = $todayHours['afternoon'][0];
            $afternoonEnd = $todayHours['afternoon'][1];

            return ($now >= $morningStart && $now <= $morningEnd) ||
                   ($now >= $afternoonStart && $now <= $afternoonEnd);
        }

        // Handle regular day format
        if (is_array($todayHours) && count($todayHours) >= 2) {
            return $now >= $todayHours[0] && $now <= $todayHours[1];
        }

        return false;
    }

    public function getOperatingStatusAttribute(): string
    {
        if ($this->is_24_hours) {
            return 'Open 24/7';
        }

        return $this->is_open ? 'Open Now' : 'Closed';
    }

    public function getTodayHoursAttribute(): ?string
    {
        if ($this->is_24_hours) {
            return '24 Hours';
        }

        $today = strtolower(now()->format('l'));
        $hours = $this->operating_hours[$today] ?? null;

        if (! $hours) {
            return 'Closed';
        }

        // Handle special Friday format with morning and afternoon sessions
        if ($today === 'friday' && is_array($hours) && isset($hours['morning'])) {
            $morningHours = $hours['morning'][0].' - '.$hours['morning'][1];
            $afternoonHours = $hours['afternoon'][0].' - '.$hours['afternoon'][1];
            $breakTime = $hours['break'][0].' - '.$hours['break'][1];

            return $morningHours.', Break: '.$breakTime.', '.$afternoonHours;
        }

        // Handle regular day format
        if (is_array($hours) && count($hours) >= 2) {
            return "{$hours[0]} - {$hours[1]}";
        }

        return 'Closed';
    }

    public function getMapMarkerDataAttribute(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'address' => $this->address,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'type' => $this->type,
            'icon' => $this->map_icon ?? 'bank',
            'color' => $this->map_color,
            'priority' => $this->map_priority,
            'isOpen' => $this->is_open,
            'status' => $this->operating_status,
            'todayHours' => $this->today_hours,
            'contacts' => $this->contacts->pluck('contact', 'type'),
        ];
    }

    public static function getAllowedFilters(): array
    {
        return [
            AllowedFilter::partial('name'),
            AllowedFilter::partial('code'),
            AllowedFilter::exact('type'),
            AllowedFilter::exact('status'),
            AllowedFilter::exact('region_id'),
            AllowedFilter::exact('district_id'),
            AllowedFilter::exact('show_on_map'),
            AllowedFilter::exact('is_24_hours'),
        ];
    }

    public static function getAllowedSorts(): array
    {
        return [
            'id',
            'name',
            'code',
            'type',
            'status',
            'map_priority',
            'created_at',
            'updated_at',
        ];
    }
}
