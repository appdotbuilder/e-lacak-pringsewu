<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Village
 *
 * @property int $id
 * @property int $district_id
 * @property string $name
 * @property string $code
 * @property string $type
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\District $district
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\HousingData> $housingData
 * @property-read int|null $housing_data_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\BacklogData> $backlogData
 * @property-read int|null $backlog_data_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Village newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Village newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Village query()
 * @method static \Illuminate\Database\Eloquent\Builder|Village whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Village whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Village whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Village whereDistrictId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Village whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Village whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Village whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Village whereUpdatedAt($value)
 * @method static \Database\Factories\VillageFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Village extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'district_id',
        'name',
        'code',
        'type',
        'description',
    ];

    /**
     * Get the district that owns the village.
     */
    public function district(): BelongsTo
    {
        return $this->belongsTo(District::class);
    }

    /**
     * Get the housing data for the village.
     */
    public function housingData(): HasMany
    {
        return $this->hasMany(HousingData::class);
    }

    /**
     * Get the backlog data for the village.
     */
    public function backlogData(): HasMany
    {
        return $this->hasMany(BacklogData::class);
    }
}