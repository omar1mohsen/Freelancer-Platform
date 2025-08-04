import CustomError from "@/utils/CustomError";
import toast from "react-hot-toast";
import axiosInstance from "./axiosClient";

// let generalInstance =  axiosInstance.head


export const getCities = async () => {
  try {
    const { data } = await axiosInstance.get(`cities`,{
      baseURL:"ssss"
    });
    return data || [];
  } catch (error: any) {
    toast.error(error.response?.data?.message);
    throw new CustomError("Failed to fetch Cities data", 500, "APIError");
  }
};
