<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class PrivateCapsules extends Model
{
    /** @use HasFactory<\Database\Factories\PrivateCapsulesFactory> */
    use HasFactory, HasApiTokens;
    protected $fillable = ['user_id', 'title', 'message', 'opening_date', 'open_status', 'open_date'];

    function user()
    {
        return $this->belongsTo(User::class);
    }

    function image()
    {
        return $this->hasMany(Image::class);
    }
}
