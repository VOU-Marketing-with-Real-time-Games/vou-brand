import AxiosClient from "./client";
import { IGameInfo, IGameInfoRequest, IGameInfoResponse } from "../types/game.type.ts";

const PREFIX = "game-info";
const URL_GET_ALL = PREFIX;
const URL_GET_BY_ID = PREFIX;
const URL_CREATE = PREFIX;
const URL_UPDATE = PREFIX;
const URL_DELETE = PREFIX;

const gameInfoApi = {
  getAllGames: async (): Promise<IGameInfo[]> => {
    const res = await AxiosClient.get(URL_GET_ALL);
    return res.data;
  },
  getGameById: async (id: number): Promise<IGameInfo> => {
    const res = await AxiosClient.get(`${URL_GET_BY_ID}/${id}`);
    return res.data;
  },
  createGame: async (gameInfo: IGameInfoRequest): Promise<IGameInfoResponse> => {
    const res = await AxiosClient.post(URL_CREATE, gameInfo);
    return res.data;
  },
  updateGame: async (id: number, gameInfo: IGameInfoRequest): Promise<IGameInfoResponse> => {
    const res = await AxiosClient.put(`${URL_UPDATE}/${id}`, gameInfo);
    return res.data;
  },
  deleteGame: async (id: number): Promise<void> => {
    await AxiosClient.delete(`${URL_DELETE}/${id}`);
  },
};

export default gameInfoApi;