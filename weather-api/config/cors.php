<?php

return [
    'paths' => ['api/*', '/weather', '/coordinates'], // Caminhos que estarão acessíveis

    'allowed_methods' => ['*'],  // Permite todos os métodos HTTP (GET, POST, etc.)

    'allowed_origins' => ['http://localhost:3000'],  // Permite requisições de localhost:3000

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],  // Permite todos os cabeçalhos

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,
];
