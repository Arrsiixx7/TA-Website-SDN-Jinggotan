<?php

namespace Database\Seeders;

use App\Models\SchoolProfile;
use Illuminate\Database\Seeder;

class SchoolProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SchoolProfile::create([
            'name' => 'SDN Jinggotan',
            'principal_name' => 'Ely Kusrini',
            'principal_message' => 'Selamat datang di website resmi SDN Jinggotan. Website ini merupakan media informasi dan komunikasi antara sekolah dengan masyarakat. Kami berkomitmen untuk memberikan pelayanan terbaik dalam dunia pendidikan.',
            'description' => 'SDN Jinggotan adalah sekolah dasar yang berkomitmen untuk mencetak generasi penerus bangsa yang berkualitas.',
            'address' => 'Jl. Jinggotan, Kecamatan, Kabupaten, Provinsi',
            'total_students' => 240,
            'total_teachers' => 9,
            'total_classes' => 12,
            'total_achievements' => 25,
            'male_students' => 125,
            'female_students' => 115,
        ]);
    }
}
