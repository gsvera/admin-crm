<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Login extends Model
{
    use HasFactory;

    public function login($iduser, $token, $nameUser)
    {
        request()->session()->put('user_auth', $iduser, +120);
        request()->session()->put('api_token', $token, +120);
        request()->session()->put('name_user', $nameUser, +120);
    }
}
