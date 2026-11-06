import axios from "axios";

const token = "1|2yTiEsABaQ50RXuoAbFfE4LrAiBEHcqhDlNVAtbs8923ed73";
const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: 'Bearer ' + token,
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
