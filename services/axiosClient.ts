"use client"
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    let locale = Cookies.get("NEXT_LOCALE") || "ar";
    const guestToken = Cookies.get("guest_token");
    const userToken = Cookies.get("user_token");

    if (!config.params) {
      config.params = {};
    }

    if (!userToken && guestToken) {
      config.headers["guest"] = guestToken;
    }

    // if(location){
    //   location = JSON.parse(location)
    //   config.params["lat"] = location?.lat
    //   config.params["lng"] = location?.lng
    // }
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

// Response interceptor to handle 401 and 422 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
      console.log("🚀 ~ error:", error)
      // const router = useRouter();
    // Using Router directly here
    if (error.response?.status === 401) {
      Cookies.remove("user_token");
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    } else if(error.response?.status === 404){
        window.location.href = "/not-found"
    }
    // else if (error.response?.status === 406 && userData?.my_subscriptions == null) {
    //   Cookies.set("not_subscribed","true")
    //   return null
    // }
    return Promise.reject(error);
  }
);

export default axiosInstance;
