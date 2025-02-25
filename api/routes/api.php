<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\UserController;

Route::middleware('guest')->prefix('auth')->group(function(){
    Route::post('/login', [LoginController::class, 'authenticate']);
});

Route::middleware('auth:sanctum')->group(function(){
    Route::prefix('auth')->group(function(){
        Route::post('/logout', [LoginController::class, 'logout']);
    });
    Route::get('/', [UserController::class, 'index']);
});

