import AxiosClient from "./client";
import { ICampaignRequestDto, ICampaign } from "../types/campaign.type.ts";
import { StatCardProps } from "../components/cards/StatCard.tsx";

const PREFIX = "campaigns";
const URL_GET_ALL = PREFIX;
const URL_GET_CAMPAIGN_BY_ID = PREFIX;
const URL_UPDATE_CAMPAIGN = PREFIX;
const URL_DELETE_CAMPAIGN = PREFIX;
const URL_CREATE_CAMPAIGN = PREFIX;
const URL_GET_STATISTICS = PREFIX + "/statistics";
const URL_GET_CAMPAIGNS_BY_BRAND_ID = PREFIX + "/brand";

const campaignApi = {
  getAllCampaigns: async (): Promise<any> => {
    const res = await AxiosClient.get(URL_GET_ALL);
    return res.data;
  },
  getCampaignById: async (id: number): Promise<ICampaign> => {
    const res = await AxiosClient.get(`${URL_GET_CAMPAIGN_BY_ID}/${id}`);
    return res.data;
  },
  updateCampaign: async (id: number, campaignDto: ICampaign): Promise<ICampaign> => {
    const res = await AxiosClient.put(`${URL_UPDATE_CAMPAIGN}/${id}`, campaignDto);
    return res.data;
  },
  deleteCampaign: async (id: number): Promise<void> => {
    await AxiosClient.delete(`${URL_DELETE_CAMPAIGN}/${id}`);
  },
  createCampaign: async (campaignDto: ICampaignRequestDto): Promise<ICampaign> => {
    const res = await AxiosClient.post(URL_CREATE_CAMPAIGN, campaignDto);
    return res.data;
  },

  getCampaignStatistics: async (): Promise<StatCardProps> => {
    const res = await AxiosClient.get(URL_GET_STATISTICS);
    return res.data;
  },

  getCampaignsByBrandId: async (brandId: string | number): Promise<ICampaign[]> => {
    const res = await AxiosClient.get(`${URL_GET_CAMPAIGNS_BY_BRAND_ID}/${brandId}`);
    return res.data;
  },
  getDistinctUserIdsByCampaignIds: async (campaignIds: number[]): Promise<number[]> => {
    const res = await AxiosClient.post("user-campaign-games/distinct-user-ids", campaignIds);
    return res.data;
  },
};

export default campaignApi;
