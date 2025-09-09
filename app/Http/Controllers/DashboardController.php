<?php

namespace App\Http\Controllers;

use App\Models\BacklogData;
use App\Models\District;
use App\Models\HousingData;
use App\Models\PerformanceIndicator;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the main dashboard with housing statistics.
     */
    public function index()
    {
        $currentYear = date('Y');
        
        // Get overall statistics
        $totalHousing = HousingData::count();
        $rtlhCount = HousingData::rtlh()->count();
        $rlhCount = HousingData::rlh()->count();
        $verifiedCount = HousingData::verified()->count();
        
        // Get statistics by district
        $districtStats = District::with(['housingData'])
            ->get()
            ->map(function ($district) {
                $totalHousing = $district->housingData->count();
                $rtlhCount = $district->housingData->where('housing_status', 'RTLH')->count();
                $rlhCount = $district->housingData->where('housing_status', 'RLH')->count();
                
                return [
                    'id' => $district->id,
                    'name' => $district->name,
                    'total_housing' => $totalHousing,
                    'rtlh_count' => $rtlhCount,
                    'rlh_count' => $rlhCount,
                    'rtlh_percentage' => $totalHousing > 0 ? round(($rtlhCount / $totalHousing) * 100, 2) : 0,
                    'rlh_percentage' => $totalHousing > 0 ? round(($rlhCount / $totalHousing) * 100, 2) : 0,
                ];
            });

        // Get backlog statistics
        $backlog1Total = BacklogData::backlog1()->where('year', $currentYear)->sum('families_count');
        $backlog2Total = BacklogData::backlog2()->where('year', $currentYear)->sum('families_count');
        
        // Get recent housing data
        $recentHousingData = HousingData::with(['district', 'village'])
            ->latest()
            ->limit(10)
            ->get()
            ->map(function ($housing) {
                return [
                    'id' => $housing->id,
                    'nik' => $housing->nik,
                    'head_of_household' => $housing->head_of_household,
                    'district' => $housing->district->name,
                    'village' => $housing->village->name,
                    'housing_status' => $housing->housing_status,
                    'eligibility_category' => $housing->eligibility_category,
                    'verification_status' => $housing->verification_status,
                    'created_at' => $housing->created_at?->format('Y-m-d H:i:s'),
                ];
            });

        // Get performance indicators
        $performanceIndicators = PerformanceIndicator::with('district')
            ->where('year', $currentYear)
            ->get()
            ->map(function ($indicator) {
                return [
                    'district_name' => $indicator->district->name,
                    'livable_house_percentage' => $indicator->livable_house_percentage,
                    'achievement_percentage' => $indicator->achievement_percentage,
                    'target_livable_houses' => $indicator->target_livable_houses,
                    'achieved_livable_houses' => $indicator->achieved_livable_houses,
                ];
            });

        return Inertia::render('dashboard', [
            'overallStats' => [
                'total_housing' => $totalHousing,
                'rtlh_count' => $rtlhCount,
                'rlh_count' => $rlhCount,
                'verified_count' => $verifiedCount,
                'rtlh_percentage' => $totalHousing > 0 ? round(($rtlhCount / $totalHousing) * 100, 2) : 0,
                'rlh_percentage' => $totalHousing > 0 ? round(($rlhCount / $totalHousing) * 100, 2) : 0,
            ],
            'districtStats' => $districtStats,
            'backlogStats' => [
                'backlog_1' => $backlog1Total,
                'backlog_2' => $backlog2Total,
                'year' => $currentYear,
            ],
            'recentHousingData' => $recentHousingData,
            'performanceIndicators' => $performanceIndicators,
        ]);
    }
}