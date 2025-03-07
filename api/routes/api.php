<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\DeveloperInfoController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->prefix('auth')->group(function(){
    Route::post('/login', [LoginController::class, 'authenticate']);
});

Route::middleware('auth:sanctum')->group(function(){
    Route::prefix('auth')->group(function(){
        Route::post('/logout', [LoginController::class, 'logout']);
    });

});

Route::get('/', [UserController::class, 'index']);

Route::post('/send-email', [EmailController::class, 'send']);

Route::prefix('developer')->group(function(){
    Route::post('/create', [DeveloperInfoController::class, 'store']);
    Route::post('/create-link', [DeveloperInfoController::class, 'storeLinks']);
    Route::delete('/remove-link', [DeveloperInfoController::class, 'removeLink']);
    Route::get('/', [DeveloperInfoController::class, 'index']);
});
