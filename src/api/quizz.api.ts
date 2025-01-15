import AxiosClient from "./client";
import { IQuizz, IQuizzCreate, IQuizzUpdate } from "../types/quizz.type";

const PREFIX = "quizzes";
const URL_GET_ALL = PREFIX;
const URL_GET_BY_ID = PREFIX;
const URL_CREATE = PREFIX;
const URL_UPDATE = PREFIX;
const URL_DELETE = PREFIX;

const quizzApi = {
  getAllQuizzes: async (): Promise<IQuizz[]> => {
    const res = await AxiosClient.get(URL_GET_ALL);
    return res.data;
  },
  getQuizzById: async (id: number): Promise<IQuizz> => {
    const res = await AxiosClient.get(`${URL_GET_BY_ID}/${id}`);
    return res.data;
  },
  createQuizz: async (quizzDto: IQuizzCreate): Promise<IQuizz> => {
    const res = await AxiosClient.post(URL_CREATE, quizzDto);
    return res.data;
  },
  updateQuizz: async (id: number, quizzDto: IQuizzUpdate): Promise<IQuizz> => {
    const res = await AxiosClient.put(`${URL_UPDATE}/${id}`, quizzDto);
    return res.data;
  },
  deleteQuizz: async (id: number): Promise<void> => {
    await AxiosClient.delete(`${URL_DELETE}/${id}`);
  },
};

export default quizzApi;
