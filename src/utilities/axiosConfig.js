import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if ([
      "/signin",
      "/signup",
      "/success-signin",
      "/confirm-account",
      "/reset-password",
      "/reset-password-form"
    ].indexOf(window.location.pathname) < 0) {
      if (error.response && error.response.status && error.response.status === 401) {
        Cookies.remove("userData", { path: '' });
        window.location.reload();
      }
    }
    return Promise.reject({ ...error });
  }
);

export default axiosInstance;
