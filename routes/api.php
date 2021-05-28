<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// Route::middleware('auth:sanctum')->get('fetch_auth', [UserController::class, 'fetchAuthUser']);
Route::middleware(['auth:sanctum'])->group(function () {
    // Route::group(['namespace' => 'App\Http\Controllers'], function () {
        Route::post('login', 'LoginController@login');
        Route::post('logout', 'LoginController@logout');
        Route::get('auth_user', 'UserController@getAuthUser');
        Route::get('all_users', 'UserController@getAllUsers');
        Route::get('fetch_auth', 'UserController@fetchAuthUser');
    // });
    Route::get('authenticated', function() {
        return true;
    });
});
