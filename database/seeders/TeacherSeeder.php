<?php

namespace Database\Seeders;

use App\Models\Teacher;
use Illuminate\Database\Seeder;

class TeacherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $teachers = [
            [
                'name' => 'Ely Kusrini',
                'role' => 'principal',
                'position' => 'Kepala Sekolah',
                'class' => null,
                'image' => null,
            ],
            [
                'name' => 'Siti Aminah, S.Pd',
                'role' => 'teacher',
                'position' => 'Wali Kelas',
                'class' => 'Kelas 1',
                'image' => null,
            ],
            [
                'name' => 'Budi Santoso, S.Pd',
                'role' => 'teacher',
                'position' => 'Wali Kelas',
                'class' => 'Kelas 2',
                'image' => null,
            ],
            [
                'name' => 'Dwi Rahayu, S.Pd',
                'role' => 'teacher',
                'position' => 'Wali Kelas',
                'class' => 'Kelas 3',
                'image' => null,
            ],
            [
                'name' => 'Agus Setiawan, S.Pd',
                'role' => 'teacher',
                'position' => 'Wali Kelas',
                'class' => 'Kelas 4',
                'image' => null,
            ],
            [
                'name' => 'Rina Wulandari, S.Pd',
                'role' => 'teacher',
                'position' => 'Wali Kelas',
                'class' => 'Kelas 5',
                'image' => null,
            ],
            [
                'name' => 'Hendra Gunawan, S.Pd',
                'role' => 'teacher',
                'position' => 'Wali Kelas',
                'class' => 'Kelas 6',
                'image' => null,
            ],
            [
                'name' => 'Admin Sekolah',
                'role' => 'staff',
                'position' => 'Admin',
                'class' => null,
                'image' => null,
            ],
            [
                'name' => 'Operator Sekolah',
                'role' => 'staff',
                'position' => 'Operator',
                'class' => null,
                'image' => null,
            ],
        ];

        foreach ($teachers as $teacher) {
            Teacher::create($teacher);
        }
    }
}
