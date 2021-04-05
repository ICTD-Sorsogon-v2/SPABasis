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

Route::middleware(['auth:sanctum'])->group(function () {
    // Route::group(['namespace' => 'App\Http\Controllers'], function () {
        Route::get('auth_user', 'UserController@getAuthUser');
        Route::get('all_users', 'UserController@getAllUsers');

        Route::post('create_update/{user?}', 'UserController@createOrUpdate');
    // });
    Route::get('authenticated', function() {
        return true;
    });
});
