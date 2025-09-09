<?php

namespace Database\Factories;

use App\Models\District;
use App\Models\Village;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BacklogData>
 */
class BacklogDataFactory extends Factory
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
            'village_id' => Village::factory(),
            'backlog_type' => fake()->randomElement(['backlog_1', 'backlog_2']),
            'families_count' => fake()->numberBetween(0, 100),
            'description' => fake()->sentence(),
            'year' => fake()->numberBetween(2020, 2030),
        ];
    }

    /**
     * Indicate that this is backlog-1 (occupancy) data.
     */
    public function backlog1(): static
    {
        return $this->state(fn (array $attributes) => [
            'backlog_type' => 'backlog_1',
            'description' => 'Jumlah keluarga tanpa rumah (okupansi)',
        ]);
    }

    /**
     * Indicate that this is backlog-2 (ownership) data.
     */
    public function backlog2(): static
    {
        return $this->state(fn (array $attributes) => [
            'backlog_type' => 'backlog_2',
            'description' => 'Jumlah keluarga dengan rumah tidak layak huni (kepemilikan)',
        ]);
    }
}