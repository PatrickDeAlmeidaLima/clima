import React from 'react';
import './WeatherDetails.css';
import weatherClouds from '../assets/weather.png';
import windIcon from '../assets/image-1.png';
import rainIcon from '../assets/image-2.png';
import cloudRainIcon from '../assets/image-3.png';
import locationIcon from '../assets/image-4.png';

function WeatherDetails({ weather, location }) {
    const today = weather?.forecast?.[0];

    const getWeatherIcon = (conditionCode) => {
        if ([12, 28].includes(conditionCode)) {
            return weatherClouds;
        } else if ([6, 15, 27].includes(conditionCode)) {
            return rainIcon;
        } else if ([18, 22].includes(conditionCode)) {
            return cloudRainIcon;
        } else {
            return windIcon;
        }
    };

    return (
        <div className="weather-container">
            <div className="location">
                <div>
                    <img src={weatherClouds} alt="Nuvem" className="cloud" />
                </div>
                <div>
                    <img src={locationIcon} alt="Localização" className="icon" />
                    {location || 'Localização não disponível'}
                </div>
            </div>

            <div className="temperature">
                {today ? `${today.temperature_min}°C - ${today.temperature_max}°C` : 'Dados não disponíveis'}
            </div>

            <div className="weather-info">
                <div className="info-box">
                    <img src={windIcon} alt="Vento" className="info-icon" />
                    <div>
                        <span>{today?.wind_speed} km/h</span>
                        Vento
                    </div>
                </div>
                <div className="info-box">
                    <img src={cloudRainIcon} alt="Umidade" className="info-icon" />
                    <div>
                        <span>{today?.humidity}%</span>
                        Umidade
                    </div>
                </div>
                <div className="info-box">
                    <img src={rainIcon} alt="Chuva" className="info-icon" />
                    <div>
                        <span>{today?.precipitation} mm</span>
                        Chuva
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeatherDetails;
