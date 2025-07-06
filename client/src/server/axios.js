import axios from 'axios';

const API = axios.create({
  baseURL: '/api/api/v1', // Will be proxied
  withCredentials: true,
});

export default API;
