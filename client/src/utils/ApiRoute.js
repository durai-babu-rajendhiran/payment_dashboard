import axios from "axios";
import { toast } from "react-toastify";

const apiClient = axios.create({
  baseURL: `http://127.0.0.1:8000/api`,
});
const getLocalStorage = JSON.parse(localStorage.getItem("user"))
apiClient.interceptors.request.use((config) => {
    const token = getLocalStorage?.token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      if (
        error.response.data &&
        error.response.data.message == "Token has expired!"
      ) {
        toast.error("Your token has expired!");
        setTimeout(() => {
          localStorage.clear();
          window.location.href = "/login";
        }, 1000);
      }
    }
    return Promise.reject(error);
  }
);

export { apiClient };
export const BASE_URL = `http://127.0.0.1:8000/api`;


export const createUser = (data) => apiClient.post("/register", data);
export const loginUser = (data) => apiClient.post("/login", data);

//Payment
export const listPayment = (page = 1) => apiClient.get(`/payment?page=${page}`);
export const createPayment = (data) => apiClient.post("/payment", data);
export const updatePayment = (id, data) => apiClient.put(`/payment/${id}`, data);
export const deletePayment = (id) => apiClient.delete(`/payment/${id}`);
//Payment
export const listAccounts = (page = 1) => apiClient.get(`/account?page=${page}`);
export const listDashboard = () => apiClient.get(`/dashboard`);
export const createAccounts = (data) => apiClient.post("/account", data);
export const updateAccounts = (id, data) => apiClient.put(`/account/${id}`, data);
export const deleteAccounts = (id) => apiClient.delete(`/account/${id}`);
