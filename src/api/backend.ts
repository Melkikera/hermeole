import axios from 'axios';

export const BACKEND_BASE_URL = 'https://10.0.2.2:7158/api';

export const backendApi = axios.create({
    baseURL: BACKEND_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
