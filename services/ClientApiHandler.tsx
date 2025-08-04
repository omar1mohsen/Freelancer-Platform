"use client";
import CustomError from "@/utils/CustomError";
import axiosInstance from "./axiosClient";
import toast from "react-hot-toast";

export const getProductsBySearch = async (params: any) => {
  try {
    const { data } = await axiosInstance.get(`/search`, {
      params: { ...params },
    });
    return data || [];
  } catch (error : any) {
    console.error("Error fetching products by category:", error);
    return [];
  }
};

export const getSortData = async () => {
  try {
    const { data } = await axiosInstance.get(`/sort`);
    return data || [];
  } catch (error : any) {
    toast.error("Failed to fetch Sort data");
  }
};
export const getBranchesData = async () => {
  try {
    const { data } = await axiosInstance.get("/Branches");
    return data?.data || [];
  } catch (error : any) {
    throw new CustomError("Failed to fetch Branches data", error?.response.status, "APIError");
  }
};

export const getCountriesData = async () => {
  try {
    const { data } = await axiosInstance.get(`/countries`);
    return data || [];
  } catch (error : any) {
    throw new CustomError("Failed to fetch countries data", error?.response.status, "APIError");
  }
};

export const getOrdersData = async (params: any = {}) => {
  try {
    const { data } = await axiosInstance.get(`/orders`, { params });
    return data || [];
  } catch (error : any) {
    console.error("Error fetching Orders:", error);
    return [];
  }
};

export const getReturnsData = async (params: any = {}) => {
  try {
    const { data } = await axiosInstance.get(`/orders/returns`, { params });
    return data || [];
  } catch (error : any) {
    console.error("Error fetching Orders:", error);
    return [];
  }
};

export const cancelOrder = async (id: string, values: any) => {
  try {
    const { data } = await axiosInstance.put(`/order/${id}/cancel`, values);
    return data || [];
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to cancel order");
  }
};

export const rateOrder = async (id: string, values: any) => {
  try {
    const { data } = await axiosInstance.post(`/order/${id}/rate`, values);
    return data || [];
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to rate order");
  }
};

export const CallReorder = async (id: string) => {
  try {
    const { data } = await axiosInstance.post(`/reorder/${id}`);
    return data || [];
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to reorder");
  }
};

export const getCancelReasons = async () => {
  try {
    const { data } = await axiosInstance.get(`/reject_reasons`);
    return data || [];
  } catch (error: any) {
    toast.error(
      error.response?.data?.message || "Failed to get reject reasons"
    );
  }
};

export const getRelatedProducts = async () => {
  try {
    const { data } = await axiosInstance.get(`/products?type=related_products`);
    return data || [];
  } catch (error: any) {
    toast.error(
      error.response?.data?.message || "Failed to get Related Products"
    );
  }
};

export const getPackages = async () => {
  try {
    const { data } = await axiosInstance.get(`/packages`);
    return data || [];
  } catch (error: any) {
    toast.error(
      error.response?.data?.message || "Failed to get packages Products"
    );
  }
};

export const PackageSubscribe = async (package_id: string) => {
  try {
    const { data } = await axiosInstance.post(`/packages/subscribe`, {
      package_id: String(package_id),
    });
    return data || [];
  } catch (error: any) {
    toast.error(
      error.response?.data?.message || "Failed to get packages Products"
    );
  }
};

export const createProductStepOne = async (values: any) => {
  try {
    const { data } = await axiosInstance.post(`/products`, { ...values });
    return data || [];
  } catch (error: any) {
    toast.error(
      error.response?.data?.message || "Failed to get packages Products"
    );
  }
};

export const createProductStepTwo = async (values: any) => {
  try {
    const { data } = await axiosInstance.post(`/products/details`, {
      ...values,
    });
    return data || [];
  } catch (error: any) {
    toast.error(
      error.response?.data?.message || "Failed to get packages Products"
    );
  }
};

export const myProductsData = async (params: any) => {
  try {
    const { data } = await axiosInstance.get(
      `/products${params ? `?${params}` : ""}`
    );
    return data || [];
  } catch (error: any) {
    // toast.error(error.response?.data?.message);
  }
};

export const getProductById = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/products/${id}`);
    return data || [];
  } catch (error: any) {
    toast.error(error.response?.data?.message );
  }
};

export const delProduct = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/products/${id}`);
    return data || [];
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to cancel order");
  }
};

export const getFilterData = async (category: string) => {
  try {
    const endpoint =
      category == "offers"
        ? "/offers/filter"
        : `/show-products/filter/${category}`;
    const { data } = await axiosInstance.get(endpoint);
    return data || [];
  } catch (error : any) {
      toast.error(error.response?.data?.message || "Failed to cancel order");
  }
};

export const getProductsByCategory = async (
  category?: string,
  params?: any
) => {
  try {
    const endpoint = category == "offers" ? "/offers" : `/show-products`;
    let finalParams =
      category == "offers" ? { ...params } : { category: category, ...params };
    const { data } = await axiosInstance.get(endpoint, {
      params: finalParams,
    });
    return data || [];
  } catch (error : any) {
      toast.error(error.response?.data?.message || "Failed to cancel order");
  }
};

export const getProductsByVendor = async (category?: string, params?: any) => {
  try {
    const { data } = await axiosInstance.get(`trader/${category}/products`, {
      params: { ...params },
    });
    return data || [];
  } catch (error : any) {
    throw new CustomError(
      "Error fetching products by category",
      error?.response.status,
      "APIError"
    );
  }
};

export const getVendorFilterData = async (category: string) => {
  try {
    const { data } = await axiosInstance.get(`trader/filter/${category}`);
    return data || [];
  } catch (error : any) {
    throw new CustomError("Failed to fetch brands data", error?.response.status, "APIError");
  }
};

export const getProductsDetails = async (product: string, params: any) => {
  try {
    const { data } = await axiosInstance.get(
      `/show-products/details/${product}`,
      { params: { ...params } }
    );
    return data || [];
  } catch (error : any) {
    throw new CustomError(
      "Error fetching products by category",
      error?.response.status,
      "APIError"
    );
  }
};

export const getCoupons = async () => {
  try {
    const { data } = await axiosInstance.get(`/coupons`);
    return data || [];
  } catch (error: any) {
    toast.error(error.response?.data?.message);
    // throw new CustomError("Error fetching products by category", error?.response.status, "APIError");
  }
};

export const getGifts = async () => {
  try {
    const { data } = await axiosInstance.get(`/gifts`);
    return data || [];
  } catch (error: any) {
    toast.error(error.response?.data?.message);
    // throw new CustomError("Error fetching products by category", error?.response.status, "APIError");
  }
};

export const buyGift = async (params: any) => {
  try {
    const { data } = await axiosInstance.post(`/gifts/use`,{...params});
    return data || [];
  } catch (error: any) {
    toast.error(error.response?.data?.message);
    // throw new CustomError("Error fetching products by category", error?.response.status, "APIError");
  }
};


export const getPoints = async () => {
  try {
    const { data } = await axiosInstance.get(`/points`);
    return data || [];
  } catch (error: any) {
    toast.error(error.response?.data?.message);
    // throw new CustomError("Error fetching products by category", error?.response.status, "APIError");
  }
};

export const getNotifications = async (page: number) => {
  try {
    const { data } = await axiosInstance.get(`/notifications`, {
      params: { page },
    });

    return {
      notifications: data.data || [],
      meta: data.meta || {},
    };
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to get notifications");
    return {
      notifications: [],
      meta: {},
    };
  }
};

export const markAllAsNotificationsRead = async () => {
  try {
    const { data } = await axiosInstance.get(`/notifications/mark-all-as-read`);
    return data || [];
  } catch (error: any) {
    toast.error(
      error.response?.data?.message || "Failed to get packages Products"
    );
  }
};

export const markAsNotificationRead = async (Notification: string) => {
  try {
    const { data } = await axiosInstance.get(`/notifications/${Notification}`);
    return data || [];
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to get packages Products");
  }
};

export const getMyOrders = async (params: any) => {
  try {
    const { data } = await axiosInstance.get(`/my-orders`, { params });
    return data || [];
  } catch (error: any) {
    throw new CustomError("Failed to fetch Orders", error?.response.status, "APIError");
  }
};

export const getMyReturns = async (params: any) => {
  try {
    const { data } = await axiosInstance.get(`/my-returns`, { params });
    return data || [];
  } catch (error: any) {
    throw new CustomError("Failed to fetch Orders", error?.response.status, "APIError");
  }
};

export const getStatics = async (params?: any) => {
  try {
    const { data } = await axiosInstance.get(`/stats?${params ? params : ""}`);
    return data || {};
  } catch (error : any) {
    console.log("🚀 ~ getStatics ~ error:", error)
    throw new CustomError("Failed to fetch  Order Details", error?.response.status, "APIError");
  }
};

export const getTopBuyer = async (id: string, params: any = {}) => {
  try {
    const { data } = await axiosInstance.get(`/my-orders/${id}/top-buyer`, {
      params,
    });
    return data || {};
  } catch (error : any) {
    throw new CustomError("Failed to fetch  Order Details", error?.response.status, "APIError");
  }
};

export const getSingleChat = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/chat/${id}`);
    return data || {};
  } catch (error : any) {
    throw new CustomError("Failed to fetch  chat Details", error?.response.status, "APIError");
  }
};

export const getOrder = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/my-orders/${id}`);
    return data || {};
  } catch (error: any) {
    throw new CustomError("Failed to fetch  Order Details", error?.response.status, "APIError");
  }
};

export const getReturnById = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/my-returns/${id}`);
    return data || {};
  } catch (error: any) {
    throw new CustomError("Failed to fetch  Order Details", error?.response.status, "APIError");
  }
};