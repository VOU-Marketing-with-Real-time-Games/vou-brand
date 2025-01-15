export interface IQuizz {
  id: number;
  name: string;
  description: string;
  secondPerQuestion: number;
  startTime: string;
  campaignGameId: number;
}

export interface IQuizzCreate {
  name: string;
  description: string;
  secondPerQuestion: number;
  startTime: string;
  campaignGameId: number;
}

export interface IQuizzUpdate {
  name?: string;
  description?: string;
  secondPerQuestion?: number;
  startTime?: string;
  campaignGameId?: number;
}
