import axios, { AxiosError } from "axios";


const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials:true
});



api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const a = error as AxiosError;
    if (a.status === 401) {
      window.localStorage.removeItem('token')
      window.location.href = "/";
      return
    }else {
      throw error
    }
  }
);

export default api;
