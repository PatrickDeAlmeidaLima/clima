import React, { useState, useEffect } from 'react';
import './SearchForm.css';
import { getCoordinates, getWeather } from '../services/api';

const SearchForm = ({ onSearch, onLocationUpdate }) => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [citySuggestions, setCitySuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        const loadDefaultWeather = async () => {
            try {
                setLoading(true);
                const coordinatesData = await getCoordinates('Brasília');
                const { latitude, longitude } = coordinatesData;

                const weatherData = await getWeather(latitude, longitude);
                setWeatherData(weatherData);
                onSearch(weatherData);
                onLocationUpdate('Brasília - Distrito Federal - Brasil'); // Localização padrão
            } catch (error) {
                setError('Erro ao carregar dados de Brasília');
            } finally {
                setLoading(false);
            }
        };

        if (!weatherData) {
            loadDefaultWeather();
        }
    }, [weatherData, onSearch, onLocationUpdate]);

    const fetchCitySuggestions = async (query) => {
        if (query.trim() === '') return;
        setError(null);
        setShowSuggestions(true);

        try {
            const response = await fetch(
                `http://api.geonames.org/searchJSON?formatted=true&q=${query}&maxRows=5&username=Maskerian`
            );
            const data = await response.json();

            if (data.geonames) {
                setCitySuggestions(data.geonames);
            }
        } catch (error) {
            setError('Erro ao buscar cidades');
        }
    };

    const handleCitySearch = async (cityName, locationInfo) => {
        setLoading(true);
        setError(null);
        setShowSuggestions(false);

        try {
            const coordinatesData = await getCoordinates(cityName);
            const { latitude, longitude } = coordinatesData;

            const weatherData = await getWeather(latitude, longitude);
            setWeatherData(weatherData);
            onSearch(weatherData);
            onLocationUpdate(locationInfo); // Atualiza a localização
        } catch (error) {
            setError('Erro ao buscar os dados');
        } finally {
            setLoading(false);
        }
    };

    const handleCitySuggestionClick = (suggestion) => {
        // const locationInfo = `${suggestion.name} - ${suggestion.adminName1} - ${suggestion.countryName}`;
        const locationInfo = `${suggestion.name} - ${suggestion.adminName1}`;
        setCity(suggestion.name);
        handleCitySearch(suggestion.name, locationInfo);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (city.trim()) {
            const suggestion = citySuggestions.find(
                (suggestion) => suggestion.name.toLowerCase() === city.toLowerCase()
            );
            if (suggestion) {
                // const locationInfo = `${suggestion.name} - ${suggestion.adminName1} - ${suggestion.countryName}`;
                const locationInfo = `${suggestion.name} - ${suggestion.adminName1}`;
                await handleCitySearch(city, locationInfo);
            } else {
                setError('Cidade não encontrada');
            }
        }
    };

    return (
        <div className="search-form-container">
            <form onSubmit={handleSubmit} className="search-form">
                <input
                    type="text"
                    placeholder="Pesquisar por localidade"
                    value={city}
                    onChange={(e) => {
                        setCity(e.target.value);
                        fetchCitySuggestions(e.target.value);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSubmit(e);
                            setShowSuggestions(false);
                        }
                    }}
                />
                <button type="submit">Buscar</button>
            </form>

            {loading && <div>Carregando...</div>}
            {error && <div>{error}</div>}

            {showSuggestions && (
                <div className="suggestions-list">
                    {citySuggestions.map((suggestion) => (
                         
                        <div
                            key={suggestion.geonameId}
                            className="suggestion-item"
                            onClick={() => handleCitySuggestionClick(suggestion)}
                        >
                            {suggestion.name}, {suggestion.countryName}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchForm;
