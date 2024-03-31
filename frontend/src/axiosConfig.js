import axios from 'axios';

// this would allow me to create my own server
export const internalAxios = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:3001', 
});

// axios would create me external 
export const externalAxios = axios.create({
  withCredentials: false, // does require external creditionasl g 
});