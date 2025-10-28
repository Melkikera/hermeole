import axios from 'axios';

const API_KEY = '232279f4a87564761ad7003b56664837'; // Replace with your OpenWeather API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeatherData = async (location:string) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                q: location,
                appid: API_KEY,
                units: 'metric', // or 'imperial' for Fahrenheit
            },
        });
        console.log('Weather data fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};