<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Position extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function setSlugAttribute($value)
    {
        $this->attributes['slug'] = Str::slug($value);
    }

    public function user()
    {
        return $this->hasMany(User::class);
    }

    public function project()
    {
        return $this->hasMany(Project::class);
    }

    public function resultProject()
    {
        return $this->hasMany(ResultProject::class);
    }

    public function taskProject()
    {
        return $this->hasMany(TaskProject::class);
    }
}
