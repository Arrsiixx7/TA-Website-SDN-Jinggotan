<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SchoolProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'principal_name',
        'principal_message',
        'total_students',
        'total_teachers',
        'total_classes',
        'total_achievements',
        'name',
        'description',
        'address',
        'logo',
        'principal_photo',
        'male_students',
        'female_students',
    ];

    protected $casts = [
        'total_students' => 'integer',
        'total_teachers' => 'integer',
        'total_classes' => 'integer',
        'total_achievements' => 'integer',
        'male_students' => 'integer',
        'female_students' => 'integer',
    ];

    public function getLogoUrlAttribute(): ?string
    {
        return $this->logo ? asset('storage/' . $this->logo) : null;
    }

    public function getPrincipalPhotoUrlAttribute(): ?string
    {
        return $this->principal_photo ? asset('storage/' . $this->principal_photo) : null;
    }
}
