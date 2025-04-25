import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.sspoid.site',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default api;
