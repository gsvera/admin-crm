<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class UserAuthenticate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        try{
            if(!$request->session()->get('user_auth')){
                request()->session()->forget('user_auth');
                
                return redirect('/');
            }
            return $next($request);
        }catch(Exception $e){
            return "Exception: ".$e->getMessage();
        }
        
    }
}
