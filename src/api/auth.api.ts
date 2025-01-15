import AxiosClient from "./client";
import { ILoginUserReq, ILoginUserRes, IFullUser, IUserVerify } from "../types/user.type.ts";

const PREFIX = "auth/";
const URL_LOGIN = PREFIX + "login";
const URL_GET_OTP = PREFIX + "get-otp";
const URL_VERIFY = PREFIX + "verify";
const URL_GETME = PREFIX + "me";
const URL_REFRESH_TOKEN = PREFIX + "refresh-token";
const authApi = {
  login: async (data: ILoginUserReq): Promise<ILoginUserRes> => {
    const res = await AxiosClient.post(URL_LOGIN, data);
    return res.data;
  },
  getOtp: async (email: string): Promise<string> => {
    const res = await AxiosClient.get(URL_GET_OTP, { params: { email } });
    return res.data;
  },
  verifyOtp: async (data: IUserVerify): Promise<string> => {
    const res = await AxiosClient.post(URL_VERIFY, data);
    return res.data;
  },
  profile: async (): Promise<IFullUser> => {
    const res = await AxiosClient.get(URL_GETME);
    return res.data;
  },
  refreshToken: async (refreshToken: string) => {
    const res = await AxiosClient.post(URL_REFRESH_TOKEN, {
      refreshToken,
    });
    return res.data;
  },
};

export default authApi;