import AxiosClient from "./client";
import { IBranchRequestDto, IBranch } from "../types/branch.type.ts";

const PREFIX = "branches";
const URL_GET_ALL = PREFIX;
const URL_GET_BRANCH_BY_ID = PREFIX;
const URL_UPDATE_BRANCH = PREFIX;
const URL_DELETE_BRANCH = PREFIX;
const URL_CREATE_BRANCH = PREFIX;
const URL_GET_BRANCHES_BY_BRAND_ID = `${PREFIX}/brand`;

const branchApi = {
  getAllBranches: async (): Promise<IBranch[]> => {
    const res = await AxiosClient.get(URL_GET_ALL);
    return res.data;
  },
  getBranchById: async (id: number): Promise<IBranch> => {
    const res = await AxiosClient.get(`${URL_GET_BRANCH_BY_ID}/${id}`);
    return res.data;
  },
  updateBranch: async (id: number, branchDto: IBranchRequestDto): Promise<IBranch> => {
    const res = await AxiosClient.put(`${URL_UPDATE_BRANCH}/${id}`, branchDto);
    return res.data;
  },
  deleteBranch: async (id: number): Promise<void> => {
    await AxiosClient.delete(`${URL_DELETE_BRANCH}/${id}`);
  },
  createBranch: async (branchDto: IBranchRequestDto): Promise<IBranch> => {
    const res = await AxiosClient.post(URL_CREATE_BRANCH, branchDto);
    return res.data;
  },
  getBranchesByBrandId: async (brandId: string | number): Promise<IBranch[]> => {
    const res = await AxiosClient.get(`${URL_GET_BRANCHES_BY_BRAND_ID}/${brandId}`);
    return res.data;
  },
};

export default branchApi;
