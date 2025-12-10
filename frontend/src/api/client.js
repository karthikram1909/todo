import axios from 'axios';

const client = axios.create({
    baseURL: '/api/todos',
});

export default client;
