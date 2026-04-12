<?php

namespace Database\Seeders;

use App\Models\Facility;
use Illuminate\Database\Seeder;

class FacilitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $facilities = [
            [
                'name' => 'Perpustakaan',
                'slug' => 'perpustakaan',
                'category' => 'akademik',
                'description' => 'Perpustakaan sekolah dengan koleksi buku lengkap',
            ],
            [
                'name' => 'Laboratorium Komputer',
                'slug' => 'laboratorium-komputer',
                'category' => 'akademik',
                'description' => 'Lab komputer dengan perangkat modern',
            ],
            [
                'name' => 'UKS',
                'slug' => 'uks',
                'category' => 'pendukung',
                'description' => 'Unit Kesehatan Sekolah untuk pertolongan pertama',
            ],
            [
                'name' => 'Lapangan Olahraga',
                'slug' => 'lapangan-olahraga',
                'category' => 'pendukung',
                'description' => 'Lapangan untuk kegiatan olahraga dan upacara',
            ],
            [
                'name' => 'Musholla',
                'slug' => 'musholla',
                'category' => 'umum',
                'description' => 'Tempat ibadah untuk siswa dan guru',
            ],
            [
                'name' => 'Kantin Sehat',
                'slug' => 'kantin-sehat',
                'category' => 'umum',
                'description' => 'Kantin dengan menu makanan sehat',
            ],
        ];

        foreach ($facilities as $facility) {
            Facility::create($facility);
        }
    }
}
