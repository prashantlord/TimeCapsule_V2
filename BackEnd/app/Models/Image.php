<?php

namespace App\Models;

use App\Http\Controllers\PrivateCapsuleController;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Image extends Model
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'private_capsules_id',
        'image_location'
    ];

    function capsule()
    {
        return $this->belongsTo(PrivateCapsuleController::class, 'private_capsules_id');
    }
}
