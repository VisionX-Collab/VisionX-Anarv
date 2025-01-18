import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5100/api',
});

export const getUserData = async () => {
    const response = await api.get('/github/user');
    return response.data;
};