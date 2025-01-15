import AxiosClient from "./client";
import { IPuzzle, IPuzzleCreate, IPuzzleUpdate } from "../types/puzzle.type";

const PREFIX = "puzzles";
const URL_GET_ALL = PREFIX;
const URL_GET_BY_ID = PREFIX;
const URL_CREATE = PREFIX;
const URL_UPDATE = PREFIX;
const URL_DELETE = PREFIX;

const puzzleApi = {
  getAllPuzzles: async (): Promise<IPuzzle[]> => {
    const res = await AxiosClient.get(URL_GET_ALL);
    return res.data;
  },
  getPuzzleById: async (id: number): Promise<IPuzzle> => {
    const res = await AxiosClient.get(`${URL_GET_BY_ID}/${id}`);
    return res.data;
  },
  createPuzzle: async (puzzleDto: IPuzzleCreate): Promise<IPuzzle> => {
    const res = await AxiosClient.post(URL_CREATE, puzzleDto);
    return res.data;
  },
  updatePuzzle: async (id: number, puzzleDto: IPuzzleUpdate): Promise<IPuzzle> => {
    const res = await AxiosClient.put(`${URL_UPDATE}/${id}`, puzzleDto);
    return res.data;
  },
  deletePuzzle: async (id: number): Promise<void> => {
    await AxiosClient.delete(`${URL_DELETE}/${id}`);
  },
};

export default puzzleApi;
