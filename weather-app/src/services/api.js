import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000', 
});

export const getCoordinates = async (city) => {
    try {
        const response = await api.get('/coordinates', { params: { city } });
        return response.data; 
    } catch (error) {
        console.error('Erro ao buscar coordenadas:', error);
        throw error;
    }
};


export const getWeather = async (lat, lon, asl = 0) => {
    try {
        const response = await api.get('/weather', { params: { lat, lon, asl } }); 
        return response.data; 
    } catch (error) {
        console.error('Erro ao buscar dados do clima:', error);
        throw error;
    }
};
