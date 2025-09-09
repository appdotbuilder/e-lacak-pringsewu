<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\BacklogData
 *
 * @property int $id
 * @property int $district_id
 * @property int $village_id
 * @property string $backlog_type
 * @property int $families_count
 * @property string|null $description
 * @property int $year
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\District $district
 * @property-read \App\Models\Village $village
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|BacklogData newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BacklogData newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BacklogData query()
 * @method static \Illuminate\Database\Eloquent\Builder|BacklogData whereBacklogType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BacklogData whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BacklogData whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BacklogData whereDistrictId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BacklogData whereFamiliesCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BacklogData whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BacklogData whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BacklogData whereVillageId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BacklogData whereYear($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BacklogData backlog1()
 * @method static \Illuminate\Database\Eloquent\Builder|BacklogData backlog2()
 * @method static \Database\Factories\BacklogDataFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class BacklogData extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'district_id',
        'village_id',
        'backlog_type',
        'families_count',
        'description',
        'year',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'families_count' => 'integer',
        'year' => 'integer',
    ];

    /**
     * Get the district that owns the backlog data.
     */
    public function district(): BelongsTo
    {
        return $this->belongsTo(District::class);
    }

    /**
     * Get the village that owns the backlog data.
     */
    public function village(): BelongsTo
    {
        return $this->belongsTo(Village::class);
    }

    /**
     * Scope a query to only include backlog-1 (occupancy) data.
     */
    public function scopeBacklog1($query)
    {
        return $query->where('backlog_type', 'backlog_1');
    }

    /**
     * Scope a query to only include backlog-2 (ownership) data.
     */
    public function scopeBacklog2($query)
    {
        return $query->where('backlog_type', 'backlog_2');
    }
}