<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\District
 *
 * @property int $id
 * @property string $name
 * @property string $code
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Village> $villages
 * @property-read int|null $villages_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\HousingData> $housingData
 * @property-read int|null $housing_data_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\BacklogData> $backlogData
 * @property-read int|null $backlog_data_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\PerformanceIndicator> $performanceIndicators
 * @property-read int|null $performance_indicators_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|District newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|District newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|District query()
 * @method static \Illuminate\Database\Eloquent\Builder|District whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|District whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|District whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|District whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|District whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|District whereUpdatedAt($value)
 * @method static \Database\Factories\DistrictFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class District extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'code',
        'description',
    ];

    /**
     * Get the villages for the district.
     */
    public function villages(): HasMany
    {
        return $this->hasMany(Village::class);
    }

    /**
     * Get the housing data for the district.
     */
    public function housingData(): HasMany
    {
        return $this->hasMany(HousingData::class);
    }

    /**
     * Get the backlog data for the district.
     */
    public function backlogData(): HasMany
    {
        return $this->hasMany(BacklogData::class);
    }

    /**
     * Get the performance indicators for the district.
     */
    public function performanceIndicators(): HasMany
    {
        return $this->hasMany(PerformanceIndicator::class);
    }
}