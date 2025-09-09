<?php

namespace Database\Factories;

use App\Models\District;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PerformanceIndicator>
 */
class PerformanceIndicatorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $targetHouses = fake()->numberBetween(100, 1000);
        $achievedHouses = fake()->numberBetween(0, $targetHouses);
        $achievementPercentage = $targetHouses > 0 ? ($achievedHouses / $targetHouses) * 100 : 0;

        return [
            'district_id' => District::factory(),
            'year' => fake()->numberBetween(2020, 2030),
            'livable_house_percentage' => fake()->randomFloat(2, 60, 95),
            'target_livable_houses' => $targetHouses,
            'achieved_livable_houses' => $achievedHouses,
            'achievement_percentage' => round($achievementPercentage, 2),
            'notes' => fake()->sentence(),
        ];
    }
}