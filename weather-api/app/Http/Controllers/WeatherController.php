<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class WeatherController extends Controller
{
    public function getWeather(Request $request)
    {
        $lat = $request->input('lat');
        $lon = $request->input('lon');
        $asl = $request->input('asl', 0); 

        $apiKey = 'bKBR6kDvdxar5JYt';  
        $client = new \GuzzleHttp\Client();
        try {
            $response = $client->request('GET', 'https://my.meteoblue.com/packages/basic-1h_basic-day', [
                'query' => [
                    'apikey' => $apiKey,
                    'lat' => $lat,
                    'lon' => $lon,
                    'asl' => $asl,
                    'format' => 'json',
                ],
                'verify' => false,  
            ]);

            $data = json_decode($response->getBody()->getContents(), true);

            $weatherData = [];
            if (isset($data['data_day'])) {
                foreach ($data['data_day']['time'] as $index => $time) {
                    $weatherData[] = [
                        'date' => $time,
                        'temperature_min' => $data['data_day']['temperature_min'][$index] ?? 'N/A',
                        'temperature_max' => $data['data_day']['temperature_max'][$index] ?? 'N/A',
                        'precipitation' => $data['data_day']['precipitation'][$index] ?? 'N/A',
                        'humidity' => $data['data_day']['relativehumidity_mean'][$index] ?? 'N/A',
                        'wind_speed' => $data['data_day']['windspeed_mean'][$index] ?? 'N/A',
                        'condition_code' => $data['data_day']['pictocode'][$index] ?? 'N/A', 
                    ];
                }
            }

            return response()->json([
                'location' => 'Latitude: ' . $lat . ', Longitude: ' . $lon,
                'forecast' => $weatherData,
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao buscar dados de clima: ' . $e->getMessage()], 500);
        }
    }
    
}
