import axios from "axios";
const token = localStorage.getItem("access_token");

const axiosIsntance = axios.create({
  baseURL: "http://142.93.183.48/api/v1",
  withCredentials: false,
  headers: {
    Authorization: token,
  },
});

axiosIsntance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== "/auth/sign-in" && err.response) {
      if (err.response.status === 401 && !originalConfig._retry && !token) {
        window.location.pathname = "/auth/sign-in";
      }
    }

    return Promise.reject(err);
  }
);

export default axiosIsntance;
