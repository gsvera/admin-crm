<?php

namespace App;

use Illuminate\Support\Facades\Http;

class ApiHelpers
{
    static function httpRequest($method = 'get', $url, $params = null)
    {
        try{
            $client;

            if($method == 'get'){
                $client = Http::withToken(env('API_TOKEN'))->get(env('API_URL').$url, $params);

            }else if($method == 'post'){
                $client = Http::withToken(env('API_TOKEN'))->post(env('API_URL').$url, $params);
                
            }
            
            $respons = json_decode($client->getBody(), true);

            return $respons;

        }catch(Exception $e){
            return "Exception: ". $e->getMessage();
        }
    }
}