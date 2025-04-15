import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.sspoid.site',
  withCredentials: true,
});

export default api;
