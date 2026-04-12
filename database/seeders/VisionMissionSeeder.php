<?php

namespace Database\Seeders;

use App\Models\VisionMission;
use Illuminate\Database\Seeder;

class VisionMissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        VisionMission::create([
            'vision' => 'Mewujudkan siswa yang beriman, bertaqwa, berakhlak mulia, cerdas, terampil, dan berwawasan lingkungan.',
            'mission' => '1. Menanamkan keimanan dan ketaqwaan melalui pembelajaran agama\n2. Mengembangkan potensi akademik siswa\n3. Menumbuhkan sikap berakhlak mulia\n4. Mengembangkan keterampilan dan kreativitas siswa\n5. Menciptakan lingkungan sekolah yang kondusif',
        ]);
    }
}
