import AxiosClient from "./client";

const PREFIX = "vouchers";
const URL_GET_DISTINCT_VOUCHER_IDS = PREFIX + "/distinct-voucher-ids";

const voucherApi = {
  getDistinctVoucherIdsByCampaignIds: async (campaignIds: number[]): Promise<string[]> => {
    const res = await AxiosClient.post(URL_GET_DISTINCT_VOUCHER_IDS, campaignIds);
    return res.data;
  },
};

export default voucherApi;