import AxiosClient from "./client";
import { IUserCreate, IFullUser } from "../types/user.type.ts";
import { StatCardProps } from "../components/cards/StatCard.tsx";
import { DailyCount } from "../types/dailyCount.type.ts";

const PREFIX = "users";
const URL_GET_ALL = PREFIX;
const URL_GET_USER_BY_ID = PREFIX;
const URL_UPDATE_USER = PREFIX;
const URL_DELETE_USER = PREFIX;
const URL_CREATE_USER_BY_ADMIN = PREFIX + "/create";
const URL_GET_STATISTICS = PREFIX + "/statistics";
const URL_GET_DAILY_COUNTS = PREFIX + "/daily-counts";
const userApi = {
  getAllUsers: async (): Promise<IFullUser[]> => {
    const res = await AxiosClient.get(URL_GET_ALL);
    return res.data;
  },
  getUserById: async (id: string | number): Promise<IFullUser> => {
    const res = await AxiosClient.get(`${URL_GET_USER_BY_ID}/${id}`);
    return res.data;
  },
  updateUser: async (id: string | number, userDto: IFullUser): Promise<IFullUser> => {
    const res = await AxiosClient.put(`${URL_UPDATE_USER}/${id}`, userDto);
    return res.data;
  },
  deleteUser: async (id: number): Promise<IFullUser> => {
    const res = await AxiosClient.delete(`${URL_DELETE_USER}/${id}`);
    return res.data;
  },
  createUserByAdmin: async (userDto: IUserCreate): Promise<IFullUser> => {
    const res = await AxiosClient.post(URL_CREATE_USER_BY_ADMIN, userDto);
    return res.data;
  },
  getUserStatistics: async (): Promise<StatCardProps> => {
    const res = await AxiosClient.get(URL_GET_STATISTICS);
    return res.data;
  },
  getUserDailyCounts: async (): Promise<DailyCount[]> => {
    const res = await AxiosClient.get(URL_GET_DAILY_COUNTS);
    return res.data;
  },
};

export default userApi;
