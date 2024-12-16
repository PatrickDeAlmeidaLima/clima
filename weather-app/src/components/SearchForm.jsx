import React, { useState, useEffect } from 'react';
import './SearchForm.css';

import { getCoordinates, getWeather } from '../services/api';

const SearchForm = ({ onSearch }) => {
    const [city, setCity] = useState(''); // Cidade buscada pelo usuário
    const [weatherData, setWeatherData] = useState(null); // Dados do clima
    const [loading, setLoading] = useState(false); // Indicador de carregamento
    const [error, setError] = useState(null); // Erros durante a busca
    const [citySuggestions, setCitySuggestions] = useState([]); // Sugestões de cidades
    const [showSuggestions, setShowSuggestions] = useState(false); // Controla a exibição da lista de sugestões

    // Carregar os dados de Brasília apenas uma vez
    useEffect(() => {
        const loadDefaultWeather = async () => {
            try {
                setLoading(true);
                const coordinatesData = await getCoordinates('Brasília'); // Coordenadas de Brasília
                const { latitude, longitude } = coordinatesData;

                const weatherData = await getWeather(latitude, longitude); // Dados do clima
                setWeatherData(weatherData); // Atualiza o estado com dados de Brasília
                onSearch(weatherData); // Passa os dados para o componente pai
            } catch (error) {
                setError('Erro ao carregar dados de Brasília');
            } finally {
                setLoading(false);
            }
        };

        if (!weatherData) {
            loadDefaultWeather(); // Carrega o clima de Brasília se não houver dados
        }
    }, [weatherData, onSearch]);

    // Função para buscar sugestões de cidades enquanto o usuário digita
    const fetchCitySuggestions = async (query) => {
        if (query.trim() === '') return;
        setError(null);
        setShowSuggestions(true); // Exibe a lista de sugestões

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

    // Função para lidar com o submit do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (city.trim()) {
            await handleCitySearch(city);
        }
    };

    // Função para buscar o clima com a cidade selecionada
    const handleCitySearch = async (cityName) => {
        setLoading(true);
        setError(null);
        setShowSuggestions(false); // Fecha a lista de sugestões após a busca

        try {
            const coordinatesData = await getCoordinates(cityName);

            if (coordinatesData.error) {
                setError('Cidade não encontrada');
                return;
            }

            const { latitude, longitude } = coordinatesData;
            const weatherData = await getWeather(latitude, longitude);

            setWeatherData(weatherData); // Atualiza o estado com dados do clima
            onSearch(weatherData); // Passa os dados para o componente pai
        } catch (error) {
            setError('Erro ao buscar os dados');
        } finally {
            setLoading(false);
        }
    };

    // Função para lidar com o clique em uma sugestão de cidade
    const handleCitySuggestionClick = (suggestion) => {
        setCity(suggestion.name); // Preenche o campo de pesquisa com o nome da cidade
        handleCitySearch(suggestion.name); // Faz a busca automaticamente
        setShowSuggestions(false); // Fecha a lista de sugestões
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
                        fetchCitySuggestions(e.target.value); // Atualiza as sugestões enquanto digita
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSubmit(e); // Aciona a busca ao pressionar Enter
                            setShowSuggestions(false); // Fecha a lista de sugestões ao pressionar Enter
                        }
                    }}
                />
                <button type="submit">Buscar</button>
            </form>

            {loading && <div>Carregando...</div>}
            {error && <div>{error}</div>}

            {/* Exibir as sugestões de cidades */}
            {showSuggestions && (
                <div className="suggestions-list">
                    {citySuggestions.map((suggestion) => (
                        <div
                            key={suggestion.geonameId}
                            className="suggestion-item"
                            onClick={() => handleCitySuggestionClick(suggestion)} // Clique na sugestão
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
