import axios from 'axios';
import { User } from '../domain/models/User';
import { LoginOkResponse } from '@/types';
import * as SecureStore from 'expo-secure-store';

async function save(key: string, value :string) {
  await SecureStore.setItemAsync(key, value);
}

const API_URL = 'http://10.0.2.2:5260/api'; // Replace with your actual API URL
console.log('API_URL:', `${API_URL}/login`);
export const loginUser = async (email: string, password: string) => {    
    console.log('Attempting to log in user with email:', email);
    try {
        const response = await axios.post(`${API_URL}/login`, {
            email,
            password
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            }
        });        
        //console.log('Login response status:', response.status);
        response.data as LoginOkResponse;
        //console.log('Logged in user from response:', response.data);
        save('name', response.data.loggeduser);
        return response;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

export const registerUser = async (email: string, password: string) => {
    console.log('Attempting to register user with email:', email);
    try {
        const response = await axios.post(`${API_URL}/users`, {
            email,
            password
        });
        console.log('Registration response status:', response);
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};