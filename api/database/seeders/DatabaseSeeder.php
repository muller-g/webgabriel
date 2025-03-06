<?php

namespace Database\Seeders;

use App\Models\DeveloperInfo;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Gabriel Müller Oliveira',
            'email' => env('USER_ADMIN_SEED'),
            'password' => Hash::make(env('USER_ADMIN_PASS')),
        ]);

        DeveloperInfo::create([
            'description' => null,
            'file_id' => null
        ]);
    }
}
