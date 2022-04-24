<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\PanelController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\PlanController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [LoginController::class, 'index']);
Route::post('login', [LoginController::class, 'login'])->name('login');
Route::get('logout', [LoginController::class, 'logout']);

Route::group(['middleware' => 'authUser'], function(){
    Route::get('/panel', [PanelController::class, 'index']);
    
    // Route::get('/crm', [ModulesController::class, 'crm']);
});

Route::group(['prefix' => 'funct', 'middleware' => 'authUser'], function(){
    Route::get('nameUser', [UsuarioController::class, 'nameUser']);
    Route::get('getUser', [UsuarioController::class, 'listUser']);
    Route::post('newUser', [UsuarioController::class, 'newUser']);
    Route::post('updateUser', [UsuarioController::class, 'updateUser']);
    Route::post('deleteUser', [UsuarioController::class, 'deleteUser']);
    Route::get('getUserById', [UsuarioController::class, 'getUserById']);

    Route::post('newCompany', [CompanyController::class, 'newCompany']);
    Route::get('getCompanys', [CompanyController::class, 'getCompanys']);
    Route::post('deleteCompany', [CompanyController::class, 'deleteCompany']);
    Route::post('updateCompany', [CompanyController::class, 'updateCompany']);
    Route::post('addUserRelComp', [CompanyController::class, 'addUserRelComp']);
    Route::get('userRelathion', [CompanyController::class, 'userRelathion']);
    Route::post('deleteRelationComUser', [CompanyController::class, 'deleteRelationComUser']);

    Route::post('newPlan', [PlanController::class, 'newPlan']);
    Route::get('getPlans', [PlanController::class, 'getPlans']);
    Route::post('updatePlan', [PlanController::class, 'updatePlan']);
    Route::post('saveSalePlan', [PlanController::class, 'saveSalePlan']);
    Route::get('getEraserPlans', [PlanController::class, 'getEraserPlans']);
    Route::post('deleteEraserSale', [PlanController::class, 'deleteEraserSale']);
});