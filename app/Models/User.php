<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
    }

    public function position()
    {
        return $this->belongsTo(Position::class);
    }

    // project
    public function project()
    {
        return $this->hasMany(Project::class);
    }

    public function parent()
    {
        return $this->belongsTo(User::class);
    }

    public function scopeGetParent($query)
    {
        return $query->whereNull('parent_id');
    }

    public function getNameAttribute($value)
    {
        return ucfirst($value);
    }

    public function child()
    {
        return $this->hasMany(User::class, 'parent_id');
    }

    public function order()
    {
        return $this->hasMany(Order::class);
    }

    public function reportCs()
    {
        return $this->hasMany(ReportCs::class);
    }

    public function reportAdv()
    {
        return $this->hasMany(ReportAdv::class);
    }

    public function reportCsAdv(){
        return $this->hasMany(ReportCs::class, 'parent_id');
    }
}
