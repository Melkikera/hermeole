import axios from 'axios';

const API_KEY = 'V302YD2YflbJYWv4ABBApCjOpzyhuXUt';
const PRIM_API_URL = 'https://prim.iledefrance-mobilites.fr/marketplace/v2/navitia/journeys'; // Replace with the actual PRIM API URL
console.log('PRIM API URL:', PRIM_API_URL);
export const fetchPrimData = async () => {
    try {
        const response = await axios.get(PRIM_API_URL, {  headers: {
                'apiKey': API_KEY,
            },params :{
                from: '2.229327;48.786701',
                to: '2.047225;48.782634'
            } });
        return response.data;
    } catch (error) {
        console.error('Error fetching data from PRIM API:', error);
        throw error;
    }
};