<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\HousingData
 *
 * @property int $id
 * @property string $nik
 * @property string $head_of_household
 * @property int $district_id
 * @property int $village_id
 * @property string $address
 * @property float|null $latitude
 * @property float|null $longitude
 * @property string $housing_status
 * @property string $eligibility_category
 * @property string $verification_status
 * @property string|null $house_condition_notes
 * @property array|null $photos
 * @property array|null $documents
 * @property int|null $verified_by
 * @property \Illuminate\Support\Carbon|null $verified_at
 * @property string|null $verification_notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\District $district
 * @property-read \App\Models\Village $village
 * @property-read \App\Models\User|null $verifier
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|HousingData newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|HousingData newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|HousingData query()
 * @method static \Illuminate\Database\Eloquent\Builder|HousingData whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HousingData whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HousingData whereDistrictId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HousingData whereDocuments($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HousingData whereEligibilityCategory($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HousingData whereHeadOfHousehold($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HousingData whereHouseConditionNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HousingData whereHousingStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HousingData whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HousingData whereLatitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HousingData whereLongitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HousingData whereNik($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HousingData wherePhotos($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HousingData whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HousingData whereVerificationNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HousingData whereVerificationStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HousingData whereVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HousingData whereVerifiedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HousingData whereVillageId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HousingData rtlh()
 * @method static \Illuminate\Database\Eloquent\Builder|HousingData rlh()
 * @method static \Illuminate\Database\Eloquent\Builder|HousingData verified()
 * @method static \Database\Factories\HousingDataFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class HousingData extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'nik',
        'head_of_household',
        'district_id',
        'village_id',
        'address',
        'latitude',
        'longitude',
        'housing_status',
        'eligibility_category',
        'verification_status',
        'house_condition_notes',
        'photos',
        'documents',
        'verified_by',
        'verified_at',
        'verification_notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'photos' => 'array',
        'documents' => 'array',
        'latitude' => 'float',
        'longitude' => 'float',
        'verified_at' => 'datetime',
    ];

    /**
     * Get the district that owns the housing data.
     */
    public function district(): BelongsTo
    {
        return $this->belongsTo(District::class);
    }

    /**
     * Get the village that owns the housing data.
     */
    public function village(): BelongsTo
    {
        return $this->belongsTo(Village::class);
    }

    /**
     * Get the user who verified this housing data.
     */
    public function verifier(): BelongsTo
    {
        return $this->belongsTo(User::class, 'verified_by');
    }

    /**
     * Scope a query to only include RTLH (uninhabitable) houses.
     */
    public function scopeRtlh($query)
    {
        return $query->where('housing_status', 'RTLH');
    }

    /**
     * Scope a query to only include RLH (livable) houses.
     */
    public function scopeRlh($query)
    {
        return $query->where('housing_status', 'RLH');
    }

    /**
     * Scope a query to only include verified housing data.
     */
    public function scopeVerified($query)
    {
        return $query->where('verification_status', 'verified');
    }
}