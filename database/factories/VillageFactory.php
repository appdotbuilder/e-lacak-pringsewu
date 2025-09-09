<?php

namespace Database\Factories;

use App\Models\District;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Village>
 */
class VillageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'district_id' => District::factory(),
            'name' => fake()->randomElement(['Desa', 'Kelurahan']) . ' ' . fake()->city(),
            'code' => fake()->unique()->numerify('######'),
            'type' => fake()->randomElement(['village', 'urban_ward']),
            'description' => fake()->sentence(),
        ];
    }
}