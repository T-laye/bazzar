import axios from "axios";

// const BASE_URL = "https://bazaar-75wr.onrender.com/api";
const BASE_URL = "http://localhost:8080/api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const axiosAuth = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});


// Create an axios instance
export const authAxios = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Add an interceptor to only include the token on the client side
authAxios.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') { // Make sure we're on the client
      const token = sessionStorage.getItem('accessToken');
      console.log(token)
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);