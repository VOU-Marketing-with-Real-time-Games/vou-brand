import { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { removeAllToken } from "../../utils/helper.ts";
import authApi from "../auth.api.ts";
import toast from "react-hot-toast";

interface IRequestAxios extends InternalAxiosRequestConfig {
  skipLoading?: boolean;
}

const onRequestConfig = (config: IRequestAxios) => {
  if (!config.headers["Authorization"]) {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }
  if (!config.headers["Content-Type"]) {
    config.headers["Content-Type"] = "application/json";
  }
  config.timeout = 30000;
  return config;
};

const onResponseError = async (err: AxiosError, axiosInstance: AxiosInstance): Promise<AxiosError | undefined> => {
  if (err.code === "ERR_NETWORK") {
    toast.error("Có một vấn đề nhỏ với máy chủ.");
    return Promise.reject(err.code);
  }

  const originalConfig = err.config as InternalAxiosRequestConfig;
  if (err.response?.status === 401) {
    const currentRefreshToken = localStorage.getItem("refreshToken");
    removeAllToken();
    if (!currentRefreshToken) return Promise.reject(err?.response?.data);

    try {
      const token = await authApi.refreshToken(currentRefreshToken!);
      localStorage.setItem("accessToken", token.data.accessToken);
      localStorage.setItem("refreshToken", currentRefreshToken);
      originalConfig.headers.Authorization = `Bearer ${token.data.accessToken}`;
    } catch (error) {
      console.log(error);
      localStorage.removeItem("auth");
      if (window.location.pathname == "/login") return Promise.reject(err?.response?.data);
    }

    return axiosInstance(originalConfig);
  }
  return Promise.reject(err?.response?.data);
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (res: AxiosResponse): AxiosResponse => {
  if (res?.data?.status === "error") throw new Error(res?.data?.message || "Internal Server Error");
  return res;
};

export const setupInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(onRequestConfig, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, (err: AxiosError) => onResponseError(err, axiosInstance));
};
