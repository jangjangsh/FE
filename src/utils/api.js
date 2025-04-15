import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.sspoid.site/',
  withCredentials: true,
});

export default api;
