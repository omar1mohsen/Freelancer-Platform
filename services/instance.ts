import axios from "axios";
import { getLocale } from "next-intl/server";
import { cookies } from "next/headers";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    common: {
      "Content-Type": "application/json",
    },
  },
});

axiosInstance.interceptors.request.use(
 async (config) => {
    try {
      const serverCookies = await cookies();
      const Context_locale = await getLocale();
      const locale = Context_locale || serverCookies.get("NEXT_LOCALE")?.value || "ar"
      const guestToken = serverCookies.get("guest_token")?.value;
      const userToken = serverCookies.get("user_token")?.value;

      let location : any = serverCookies.get("client_location")?.value;

      if (!config.params) {
        config.params = {};
      }

      // // Apply cache-busting only if the user_token is removed
      // if (!userToken) {
      //   config.params["cacheBuster"] = new Date().getTime(); 
      // }

      if(location){
        location = JSON.parse(location)
        config.params["lat"] = location?.lat
        config.params["lng"] = location?.lng
      }

      if (!userToken && guestToken) {
        config.headers["guest"] = guestToken;
      }

      if(userToken){
        config.headers["Authorization"] = `Bearer ${userToken}`;
      }

      config.headers["Accept-Language"] = locale;
    } catch (error) {
      console.error("Error setting Axios request headers: ", error);
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const serverCookies = await cookies();

    if (error.response?.status === 401) {
      serverCookies.delete("user_token");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
