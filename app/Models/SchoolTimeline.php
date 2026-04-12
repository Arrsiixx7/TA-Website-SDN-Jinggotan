<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SchoolTimeline extends Model
{
    protected $fillable = [
        'year',
        'title',
        'description',
        'order',
    ];

    protected $casts = [
        'order' => 'integer',
    ];
}
