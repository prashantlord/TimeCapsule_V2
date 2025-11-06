<?php

namespace Database\Factories;

use App\Models\PrivateCapsules;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Image>
 */
class ImageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'private_capsules_id' => PrivateCapsules::factory(),
            'image_location' => 'app/images/' . fake()->uuid() . '.jpg',
        ];
    }
}
