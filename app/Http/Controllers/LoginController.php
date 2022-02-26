<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Login;
use App\ApiHelpers;

class LoginController extends Controller
{
    public function index()
    {        
        if(request()->session()->get('user_auth')){
            return redirect('panel');
        }
        return view('login.index');
    }
    public function login()
    {
        $params = ["email" => request('email'), 'password' => request('password')];
        $url = 'login-panel';
        $method = 'post';
        
        $client = ApiHelpers::httpRequest($method, $url, $params);
        if($client['error'] == false){
            $makeLogin = new Login;
            $makeLogin->login($client['data']['id_user'], $client['data']['token'], $client['data']['name_user']);
            return redirect('/panel');
        }
        return back()->with("message", "Usuario o contraseña incorrecta");
    }
    public function logout()
    {
        request()->session()->forget('user_auth');
        request()->session()->forget('api_token');
        request()->session()->forget('name_user');

        return response()->json("logout");
    }
}
