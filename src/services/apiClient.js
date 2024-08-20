// src/services/apiClient.js

import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // Base URL for your API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
