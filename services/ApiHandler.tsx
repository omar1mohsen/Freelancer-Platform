import axios from "axios";
import axiosInstance from "./instance";


export const getHomeData = async () => {
  try {
    const { data } = await axiosInstance.get("/home");
    return { data, error: false };
  } catch (error: any) {
    return { data: [], error: {message: error.response?.data?.message, status:error?.response.status }};
    // throw new CustomError("Failed to fetch Home Data", error?.response.status, "APIError");
  }
};
