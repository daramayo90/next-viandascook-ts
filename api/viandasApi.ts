import axios from 'axios';

const viandasApi = axios.create({
   baseURL: '/api',
});

export default viandasApi;
