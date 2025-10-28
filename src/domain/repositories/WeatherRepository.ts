import { fetchWeatherData } from '../../api/openWeather';
import { Weather } from '../models/Weather';

export class WeatherRepository {
    async getWeather(location: string): Promise<Weather> {
        const weatherData = await fetchWeatherData(location);
        return weatherData;
    }
}