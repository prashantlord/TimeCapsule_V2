<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PrivateCapsules>
 */
class PrivateCapsulesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $openStatus = $this->faker->boolean();

        return [
            'user_id' => User::factory(),
            'title' => $this->faker->sentence(3),
            'message' => $this->faker->paragraph(),
            'opening_date' => $this->faker->dateTimeBetween('+1 week', '+1 year'),
            'open_status' => $openStatus,
            'open_date' => $openStatus
                ? $this->faker->dateTimeBetween('-1 year', 'now') // only if open_status is true
                : null, // null if open_status is false
        ];
    }
}
