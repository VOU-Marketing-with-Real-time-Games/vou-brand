import { IBrand } from "./brand.type.ts";

export interface IFullUser {
  id: string;
  fullName: string;
  avatar: string;
  status: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  phoneNumber: string;
  brand: IBrand;
}

export interface IRegisterUserReq {
  email: string;
  password: string;
  name: string;
}

export interface ILoginUserReq {
  username: string;
  password: string;
}

export interface IUserVerify {
  email: string;
  otp: string;
}

export interface ILoginUserRes extends IFullUser {
  accessToken: string;
  refreshToken: string;
}

export type AuthQueryConfig = {
  access_token?: string;
  refresh_token?: string;
};

export interface IResetPassword {
  token: string;
  password: string;
}

export interface IUserCreate {
  fullName: string;
  username: string;
  email: string;
  password: string;
  role: string;
  phoneNumber: string;
}
