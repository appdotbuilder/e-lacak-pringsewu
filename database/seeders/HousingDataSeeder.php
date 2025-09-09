<?php

namespace Database\Seeders;

use App\Models\BacklogData;
use App\Models\District;
use App\Models\HousingData;
use App\Models\PerformanceIndicator;
use App\Models\Village;
use Illuminate\Database\Seeder;

class HousingDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create districts based on actual Pringsewu Regency districts
        $districts = [
            ['name' => 'Kecamatan Pringsewu', 'code' => '1801'],
            ['name' => 'Kecamatan Gading Rejo', 'code' => '1802'],
            ['name' => 'Kecamatan Sukoharjo', 'code' => '1803'],
            ['name' => 'Kecamatan Banyumas', 'code' => '1804'],
            ['name' => 'Kecamatan Adiluwih', 'code' => '1805'],
            ['name' => 'Kecamatan Pagelaran', 'code' => '1806'],
            ['name' => 'Kecamatan Ambarawa', 'code' => '1807'],
            ['name' => 'Kecamatan Pagelaran Utara', 'code' => '1808'],
        ];

        foreach ($districts as $districtData) {
            $district = District::create($districtData);

            // Create 3-5 villages per district
            for ($i = 1; $i <= random_int(3, 5); $i++) {
                $village = Village::create([
                    'district_id' => $district->id,
                    'name' => fake()->randomElement(['Desa', 'Kelurahan']) . ' ' . fake()->city(),
                    'code' => $district->code . str_pad((string)$i, 3, '0', STR_PAD_LEFT),
                    'type' => fake()->randomElement(['village', 'urban_ward']),
                    'description' => 'Desa/Kelurahan di ' . $district->name,
                ]);

                // Create housing data for each village
                HousingData::factory()
                    ->count(random_int(10, 30))
                    ->create([
                        'district_id' => $district->id,
                        'village_id' => $village->id,
                    ]);

                // Create backlog data for current year
                BacklogData::create([
                    'district_id' => $district->id,
                    'village_id' => $village->id,
                    'backlog_type' => 'backlog_1',
                    'families_count' => random_int(5, 25),
                    'description' => 'Keluarga tanpa rumah (okupansi)',
                    'year' => date('Y'),
                ]);

                BacklogData::create([
                    'district_id' => $district->id,
                    'village_id' => $village->id,
                    'backlog_type' => 'backlog_2',
                    'families_count' => random_int(10, 40),
                    'description' => 'Keluarga dengan rumah tidak layak huni',
                    'year' => date('Y'),
                ]);
            }

            // Create performance indicators for each district
            for ($year = 2020; $year <= 2030; $year++) {
                $targetHouses = random_int(200, 500);
                $achievedHouses = $year <= (int)date('Y') ? random_int(100, $targetHouses) : 0;
                $achievementPercentage = ($achievedHouses / $targetHouses) * 100;

                PerformanceIndicator::create([
                    'district_id' => $district->id,
                    'year' => $year,
                    'livable_house_percentage' => fake()->randomFloat(2, 70, 95),
                    'target_livable_houses' => $targetHouses,
                    'achieved_livable_houses' => $achievedHouses,
                    'achievement_percentage' => round($achievementPercentage, 2),
                    'notes' => $year <= date('Y') ? 'Data aktual' : 'Target',
                ]);
            }
        }
    }
}