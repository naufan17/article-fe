import Axios, { type AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },

  withCredentials: true
});

export default axiosInstance;