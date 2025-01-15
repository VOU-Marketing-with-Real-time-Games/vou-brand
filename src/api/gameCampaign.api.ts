import AxiosClient from "./client";
import { IGameCampaign, IGameCampaignCreate, IGameCampaignUpdate } from "../types/gameCampaign.type";

const PREFIX = "game-campaigns";
const URL_GET_ALL = PREFIX;
const URL_GET_BY_ID = PREFIX;
const URL_CREATE = PREFIX;
const URL_UPDATE = PREFIX;
const URL_DELETE = PREFIX;

const gameCampaignApi = {
  getAllGameCampaigns: async (): Promise<IGameCampaign[]> => {
    const res = await AxiosClient.get(URL_GET_ALL);
    return res.data;
  },
  getGameCampaignById: async (id: number): Promise<IGameCampaign> => {
    const res = await AxiosClient.get(`${URL_GET_BY_ID}/${id}`);
    return res.data;
  },
  createGameCampaign: async (gameCampaignDto: IGameCampaignCreate): Promise<IGameCampaign> => {
    const res = await AxiosClient.post(URL_CREATE, gameCampaignDto);
    return res.data;
  },
  updateGameCampaign: async (id: number, gameCampaignDto: IGameCampaignUpdate): Promise<IGameCampaign> => {
    const res = await AxiosClient.put(`${URL_UPDATE}/${id}`, gameCampaignDto);
    return res.data;
  },
  deleteGameCampaign: async (id: number): Promise<void> => {
    await AxiosClient.delete(`${URL_DELETE}/${id}`);
  },
};

export default gameCampaignApi;
