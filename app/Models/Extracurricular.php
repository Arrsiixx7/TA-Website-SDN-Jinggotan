<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Extracurricular extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'image',
    ];

    protected $appends = ['image_url'];

    protected static function booted(): void
    {
        static::creating(function (Extracurricular $extracurricular) {
            if (empty($extracurricular->slug)) {
                $extracurricular->slug = Str::slug($extracurricular->name);
            }
        });

        static::updating(function (Extracurricular $extracurricular) {
            if ($extracurricular->isDirty('name') && empty($extracurricular->slug)) {
                $extracurricular->slug = Str::slug($extracurricular->name);
            }
        });
    }

    public function getImageUrlAttribute(): ?string
    {
        return $this->image ? asset('storage/' . $this->image) : null;
    }
}
