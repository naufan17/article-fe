import Axios, { type AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },

  // withCredentials: true
});

export default axiosInstance;