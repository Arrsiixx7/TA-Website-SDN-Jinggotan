<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin SDN Jinggotan',
            'email' => 'sdnjinggotan@gmail.com',
            'password' => Hash::make('adminsdnjinggotan'),
            'email_verified_at' => now(),
        ]);
    }
}
