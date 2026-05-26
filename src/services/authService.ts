import { backendApi, BACKEND_BASE_URL } from '../api/backend';
import { LoginOkResponse } from '@/types';
import * as SecureStore from 'expo-secure-store';

async function save(key: string, value :string) {
  await SecureStore.setItemAsync(key, value);
}

console.log('API_URL:', `${BACKEND_BASE_URL}/login`);
export const loginUser = async (email: string, password: string) => {  
    console.log('Attempting to log in user with email:', email);
    try {
        const response = await backendApi.post('/login', {
            email,
            password
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

export const registerUser = async (userName: string, email: string, password: string,name:string) => {
    console.log('Attempting to register user with email:', email);
    try {
        const response = await backendApi.post('/users', {
            userName,
            email,
            password,
            name
        });
        console.log('Registration response status:', response);
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};