<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\PerformanceIndicator
 *
 * @property int $id
 * @property int $district_id
 * @property int $year
 * @property float $livable_house_percentage
 * @property int $target_livable_houses
 * @property int $achieved_livable_houses
 * @property float $achievement_percentage
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\District $district
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|PerformanceIndicator newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PerformanceIndicator newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PerformanceIndicator query()
 * @method static \Illuminate\Database\Eloquent\Builder|PerformanceIndicator whereAchievedLivableHouses($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PerformanceIndicator whereAchievementPercentage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PerformanceIndicator whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PerformanceIndicator whereDistrictId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PerformanceIndicator whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PerformanceIndicator whereLivableHousePercentage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PerformanceIndicator whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PerformanceIndicator whereTargetLivableHouses($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PerformanceIndicator whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PerformanceIndicator whereYear($value)
 * @method static \Database\Factories\PerformanceIndicatorFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class PerformanceIndicator extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'district_id',
        'year',
        'livable_house_percentage',
        'target_livable_houses',
        'achieved_livable_houses',
        'achievement_percentage',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'year' => 'integer',
        'livable_house_percentage' => 'float',
        'target_livable_houses' => 'integer',
        'achieved_livable_houses' => 'integer',
        'achievement_percentage' => 'float',
    ];

    /**
     * Get the district that owns the performance indicator.
     */
    public function district(): BelongsTo
    {
        return $this->belongsTo(District::class);
    }
}