import axios from 'axios';

// Use a default base URL if VITE_APP_API_BASE_URL is not defined
const baseURL = import.meta.env.VITE_APP_API_BASE_URL || 'http://localhost:3000';

const instance = axios.create({
  baseURL: baseURL,
});

export default instance;
