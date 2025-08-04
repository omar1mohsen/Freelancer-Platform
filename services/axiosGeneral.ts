"use client"
import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GENERAL_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    let locale = Cookies.get("NEXT_LOCALE") || "en";
    const guestToken = Cookies.get("guest_token");
    const userToken = Cookies.get("user_token");
    let location : any = Cookies.get("client_location");

    if (!config.params) {
      config.params = {};
    }

    if (!userToken && guestToken) {
      config.params["guest_token"] = guestToken;
    }

    // Check if request is server-side or client-side

    if(userToken){
      config.headers["Authorization"] = `Bearer ${userToken}`;
    }
    config.headers["Accept-Language"] = locale;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove("user_token");
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
