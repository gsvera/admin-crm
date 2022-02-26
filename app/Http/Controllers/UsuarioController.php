<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ApiHelpers;

class UsuarioController extends Controller
{
    public function nameUser()
    {
        try{
            $nameUser = request()->session()->get('name_user');

            return response()->json($nameUser);
        }
        catch(Exception $e)
        {
            return "Exception: ". $e->getMessage();
        }
    }
    public function listUser()
    {
        try{
            $listUser = ApiHelpers::httpRequest('get', 'user/get-users');
            return response()->json($listUser);
        }
        catch(Exception $e)
        {
            return "Exception ".$e->getMessage();
        }
    }
    public function newUser()
    {
        try{
            $params = [
                'first_name' => request('first_name'),
                'last_name' => request('last_name'),
                'email' => request('email'),
                'password' => request('password'),
                'active' => request('active'),
                'user_panel' => request('user_panel'),
                'enviroment' => request('enviroment')
            ];
            
            $sendNewUser = ApiHelpers::httpRequest('post', 'user/new-user', $params);
            return response()->json($sendNewUser);
        }
        catch(Exception $e)
        {
            return "Exception: ".$e->getMessage();
        }
    }
    public function deleteUser()
    {
        try{
            $params = [
                'id_user' => request('id_user')
            ];
            
            $sendDeleteUser = ApiHelpers::httpRequest('post', 'user/delete-user', $params);
            return response()->json($sendDeleteUser);
        }
        catch(Exception $e)
        {
            return "Exception: ".$e->getMessage();
        }
    }
    // SIN USO POR EL MOMENTO
    public function getUserById()
    {
        try{
            $params = [
                'id_user' => request('id_user')
            ];

            $getUser = ApiHelpers::httpRequest('get', 'user/get-userbyid', $params);

            return response()->json($getUser);
        }
        catch(Exception $e)
        {
            return "Exception: ".$e->getMessage();
        }
    }
    public function updateUser()
    {
        try{
            $params = [
                'id_user' => request('id_user'),
                'first_name' => request('first_name'),
                'last_name' => request('last_name'),
                'email' => request('email'),
                'password' => request('password'),
                'active' => request('active'),
                'user_panel' => request('user_panel'),
                'enviroment' => request('enviroment')
            ];

            $resp = ApiHelpers::httpRequest('post', 'user/update-user', $params);

            return response()->json($resp);
        }
        catch(Exception $e)
        {
            return "Exception: ".$e->getMessage();
        }
    }
}
