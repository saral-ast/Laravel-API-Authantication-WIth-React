import axios from "axios";
import Cookies from "js-cookie";

// Set base URL for all API requests
axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

// ✅ Add a request interceptor to include the token from cookies
axios.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); // 🔁 use cookie instead of localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Add a response interceptor to handle unauthorized errors
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      Cookies.remove("token"); // clear token on 401

      // Dispatch a custom logout event
      const event = new CustomEvent("auth:unauthorized");
      window.dispatchEvent(event);
    }
    return Promise.reject(error);
  }
);

export default axios;
