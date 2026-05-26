import axios from 'axios';

export const BACKEND_BASE_URL = 'https://10.0.2.2:7158/api';

export const BACKEND_ENDPOINTS = {
    root: '/',
    health: '/health',
    login: '/login',
    users: '/users',
} as const;

export type BackendEndpointName = keyof typeof BACKEND_ENDPOINTS;

export const buildBackendUrl = (endpoint: BackendEndpointName) =>
    `${BACKEND_BASE_URL}${BACKEND_ENDPOINTS[endpoint]}`;

export const backendApi = axios.create({
    baseURL: BACKEND_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getBackendHealth = async () => backendApi.get(BACKEND_ENDPOINTS.health);

