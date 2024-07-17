// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://backend-shopping-site.onrender.com/api', // Replace with your backend URL on Render
});

export default instance;
