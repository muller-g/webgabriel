<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\DeveloperInfoController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VisitsController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AvaliationsController;

Route::middleware('guest')->prefix('auth')->group(function(){
    Route::post('/login', [LoginController::class, 'authenticate']);
});

Route::middleware('auth:sanctum')->group(function(){
    Route::prefix('auth')->group(function(){
        Route::post('/logout', [LoginController::class, 'logout']);
    });

    Route::prefix('developer')->group(function(){
        Route::post('/create', [DeveloperInfoController::class, 'store']);
        Route::post('/create-link', [DeveloperInfoController::class, 'storeLinks']);
        Route::delete('/remove-link', [DeveloperInfoController::class, 'removeLink']);
        Route::get('/emails', [EmailController::class, 'index']);
        Route::get('/emails/{id}', [EmailController::class, 'get']);
        Route::post('/send-answer-email', [EmailController::class, 'sendAnswerEmail']);
    });

    Route::get('/', [UserController::class, 'index']);
});

Route::get('/developer/visits', [VisitsController::class, 'index']);
Route::get('/developer', [DeveloperInfoController::class, 'index']);
Route::get('/avaliations', [AvaliationsController::class, 'index']);
Route::post('/send-email', [EmailController::class, 'send']);

