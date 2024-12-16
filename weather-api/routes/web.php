<?php

use App\Http\Controllers\LocationController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WeatherController;

Route::get('/coordinates', [LocationController::class, 'getCoordinates']);
Route::get('/weather', [WeatherController::class, 'getWeather']);
Route::get('/default-weather', [WeatherController::class, 'getDefaultWeather']);

