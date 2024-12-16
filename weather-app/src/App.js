import React, { useState } from 'react';
import './App.css'; // Adicione os estilos CSS para o app
import SearchForm from './components/SearchForm';
import WeatherDetails from './components/WeatherDetails';

const App = () => {
    const [weather, setWeather] = useState(null); // Estado para armazenar os dados do clima

    // Função que será chamada pelo SearchForm para buscar os dados do clima
    const handleSearch = async (weatherData) => {
        setWeather(weatherData); // Atualiza o estado com os dados do clima
    };

    return (
        <div className="app">
            <SearchForm onSearch={handleSearch} />
            {weather && <WeatherDetails weather={weather} />}
        </div>
    );
};

export default App;
