<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\RoomFacility;

class RoomFacilitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $facilities = [
            [
                'name' => 'Meja & Kursi Ergonomis',
                'icon_key' => 'chair',
                'description' => 'Nyaman untuk belajar',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Papan Tulis Interaktif',
                'icon_key' => 'board',
                'description' => 'Media pembelajaran visual',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Proyektor LCD',
                'icon_key' => 'projector',
                'description' => 'Presentasi multimedia',
                'order' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'Ventilasi & Pencahayaan',
                'icon_key' => 'sun',
                'description' => 'Sirkulasi udara optimal',
                'order' => 4,
                'is_active' => true,
            ],
            [
                'name' => 'Rak Buku & Lemari',
                'icon_key' => 'book',
                'description' => 'Penyimpanan terorganisir',
                'order' => 5,
                'is_active' => true,
            ],
            [
                'name' => 'AC / Kipas Angin',
                'icon_key' => 'fan',
                'description' => 'Suhu ruangan nyaman',
                'order' => 6,
                'is_active' => true,
            ],
        ];

        foreach ($facilities as $facility) {
            RoomFacility::updateOrCreate(
                ['name' => $facility['name']],
                $facility
            );
        }
    }
}
