<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class LocationController extends Controller
{
    public function getCoordinates(Request $request)
    {
        $city = $request->input('city');
        $apiKey = 'pk.2ef9fe09ccf1ceff286f8b6c1ac86e04'; // Sua chave de API

        $client = new \GuzzleHttp\Client();
        try {
            $response = $client->request('GET', 'https://us1.locationiq.com/v1/search.php', [
                'query' => [
                    'q' => $city,            // Nome da cidade
                    'key' => $apiKey,        // Sua chave da API
                    'format' => 'json',      // Retorna dados em formato JSON
                    'language' => 'pt',      // Solicita resposta em português
                ],
                'verify' => false,
            ]);

            $data = json_decode($response->getBody()->getContents(), true);
            if (empty($data)) {
                return response()->json(['error' => 'Cidade não encontrada'], 404);
            }

            $coordinates = $data[0];

            return response()->json([
                'latitude' => $coordinates['lat'],
                'longitude' => $coordinates['lon'],
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao buscar coordenadas: ' . $e->getMessage()], 500);
        }
    }
}
