import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator,Image } from 'react-native';
import { fetchWeatherData } from '../../../api/openWeather';
import { Weather } from '../../../domain/models/Weather';
import moment from 'moment';

const WeatherWidget = () => {
    const [weather, setWeather] = useState<Weather | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getWeather = async () => {
            try {
                const data = await fetchWeatherData('Meudon'); // Replace 'your-location' with actual location
                let weather = (data && {
                    temperature: data.main.temp,
                    humidity: data.main.humidity,
                    description: data.weather[0].description,
                    windSpeed: data.wind.speed,
                    icon: data.weather[0].icon,
                    location: data.name,
                    date: new Date(data.dt * 1000)
                });
                setWeather(weather);
            } catch (err) {
                setError('Failed to fetch weather data');
            } finally {
                setLoading(false);
            }
        };

        getWeather();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {weather && (
                <>
                    <Text style={styles.title}>{weather.location}</Text>
                    <Text style={styles.temp}>{weather.temperature}°C</Text>
                    <Image source={{uri: `http://openweathermap.org/img/w/${weather.icon}.png`}} style={styles.tinyLogo} />                    
                    <Text style={styles.description}>{weather.description}</Text>
                    <Text>Humidity: {weather.humidity}%</Text>
                    <Text>Wind Speed: {weather.windSpeed} m/s</Text>
                    <Text>{moment(weather.date).format('DD/MM/YYYY HH:mm:ss')}</Text>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    temp: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        color: '#666',
    },
    errorText: {
        color: 'red',
    },
     tinyLogo: {
    width: 50,
    height: 50,
  },
});

export default WeatherWidget;