// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://your-backend-url-on-render.com/api', // Replace with your backend URL on Render
});

export default instance;
