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


export const authAxiso= axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem('token')}` },
})