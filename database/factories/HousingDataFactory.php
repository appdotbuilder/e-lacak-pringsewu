<?php

namespace Database\Factories;

use App\Models\District;
use App\Models\User;
use App\Models\Village;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\HousingData>
 */
class HousingDataFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $housingStatus = fake()->randomElement(['RTLH', 'RLH']);
        $eligibilityCategory = $housingStatus === 'RTLH' 
            ? fake()->randomElement(['uninhabitable', 'under_repair']) 
            : 'livable';

        return [
            'nik' => fake()->unique()->numerify('################'),
            'head_of_household' => fake()->name(),
            'district_id' => District::factory(),
            'village_id' => Village::factory(),
            'address' => fake()->address(),
            'latitude' => fake()->latitude(-8.5, -4.5), // South Sumatra coordinates
            'longitude' => fake()->longitude(102, 106), // South Sumatra coordinates
            'housing_status' => $housingStatus,
            'eligibility_category' => $eligibilityCategory,
            'verification_status' => fake()->randomElement(['pending', 'verified', 'rejected']),
            'house_condition_notes' => fake()->paragraph(),
            'photos' => fake()->randomElements([
                'photos/house_1.jpg',
                'photos/house_2.jpg',
                'photos/house_3.jpg',
            ], random_int(1, 3)),
            'documents' => fake()->randomElements([
                'documents/ktp.pdf',
                'documents/kk.pdf',
                'documents/certificate.pdf',
            ], random_int(1, 3)),
        ];
    }

    /**
     * Indicate that the housing data is verified.
     */
    public function verified(): static
    {
        return $this->state(fn (array $attributes) => [
            'verification_status' => 'verified',
            'verified_by' => User::factory(),
            'verified_at' => fake()->dateTimeBetween('-1 month', 'now'),
            'verification_notes' => 'Data telah diverifikasi dan sesuai.',
        ]);
    }

    /**
     * Indicate that the housing data is RTLH (uninhabitable).
     */
    public function rtlh(): static
    {
        return $this->state(fn (array $attributes) => [
            'housing_status' => 'RTLH',
            'eligibility_category' => fake()->randomElement(['uninhabitable', 'under_repair']),
        ]);
    }

    /**
     * Indicate that the housing data is RLH (livable).
     */
    public function rlh(): static
    {
        return $this->state(fn (array $attributes) => [
            'housing_status' => 'RLH',
            'eligibility_category' => 'livable',
        ]);
    }
}