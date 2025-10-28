import { fetchWeatherData } from '../api/openWeather';

export const getWeatherData = async (location: string) => {
    try {
        const weatherData = await fetchWeatherData(location);
        return weatherData;
    } catch (error) {
        throw new Error('Error fetching weather data: ' + error.message);
    }
};