import AxiosClient from "./client";
import { IVoucher, IVoucherCreate, IVoucherUpdate } from "../types/voucher.type";

const PREFIX = "vouchers";
const URL_GET_ALL = PREFIX;
const URL_GET_VOUCHER_BY_ID = PREFIX;
const URL_UPDATE_VOUCHER = PREFIX;
const URL_DELETE_VOUCHER = PREFIX;
const URL_CREATE_VOUCHER = PREFIX;
const URL_GET_DISTINCT_VOUCHER_IDS = PREFIX + "/distinct-voucher-ids";

const voucherApi = {
  getAllVouchers: async (): Promise<IVoucher[]> => {
    const res = await AxiosClient.get(URL_GET_ALL);
    return res.data;
  },
  getVoucherById: async (id: string): Promise<IVoucher> => {
    const res = await AxiosClient.get(`${URL_GET_VOUCHER_BY_ID}/${id}`);
    return res.data;
  },
  updateVoucher: async (id: string, voucherDto: IVoucherUpdate): Promise<IVoucher> => {
    const res = await AxiosClient.put(`${URL_UPDATE_VOUCHER}/${id}`, voucherDto);
    return res.data;
  },
  deleteVoucher: async (id: string): Promise<void> => {
    await AxiosClient.delete(`${URL_DELETE_VOUCHER}/${id}`);
  },
  createVoucher: async (voucherDto: IVoucherCreate): Promise<IVoucher> => {
    const res = await AxiosClient.post(URL_CREATE_VOUCHER, voucherDto);
    return res.data;
  },
  getDistinctVoucherIdsByCampaignIds: async (campaignIds: number[]): Promise<string[]> => {
    const res = await AxiosClient.post(URL_GET_DISTINCT_VOUCHER_IDS, campaignIds);
    return res.data;
  },
};

export default voucherApi;