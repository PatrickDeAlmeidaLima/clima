import React, { useState } from 'react';
import './App.css'; // Adicione os estilos CSS para o app
import SearchForm from './components/SearchForm';
import WeatherDetails from './components/WeatherDetails';

function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [location, setLocation] = useState('');

    return (
        <div className="app">
            <SearchForm
                onSearch={(data) => setWeatherData(data)}
                onLocationUpdate={(locationInfo) => setLocation(locationInfo)}
            />
            <WeatherDetails weather={weatherData} location={location} />
        </div>
    );
}

export default App;
