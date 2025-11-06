<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Admin extends Model
{
    use HasApiTokens;
    
    protected $fillable = ['email', 'password'];
    protected $hidden = ['email', 'password'];
}
