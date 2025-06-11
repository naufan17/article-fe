'use client';

import { useAuthStore } from '@/stores/use-auth-store';
import Axios, { type AxiosInstance } from 'axios';
import router from 'next/router';

const axiosInstance: AxiosInstance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },

  // withCredentials: true
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token

    if (token) config.headers.Authorization = `Bearer ${token}`;
    
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response?.data.message === 'Access token is invalid' ||
      error.response?.data.message === 'User not found' ||
      error.response?.data.message === 'jwt expired' ||
      error.response?.data.message === 'jwt malformed' ||
      error.response?.data.message === 'jwt signature is required'
    ) {
      useAuthStore.getState().setLogout()
      router.push('/login')
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;