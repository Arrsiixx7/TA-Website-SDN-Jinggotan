<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassDistribution extends Model
{
    use HasFactory;

    protected $fillable = [
        'class_name',
        'total_students',
    ];

    protected $casts = [
        'total_students' => 'integer',
    ];
}
