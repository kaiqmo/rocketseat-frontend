import axios from 'axios';

const api = axios.create({
    baseURL:'https://kaiquestack-backend.herokuapp.com',
});

export default api;