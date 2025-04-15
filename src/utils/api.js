import axios from 'axios';

const api = axios.create({
  baseURL: 'https://43.203.173.135',
  withCredentials: true,
});

export default api;
