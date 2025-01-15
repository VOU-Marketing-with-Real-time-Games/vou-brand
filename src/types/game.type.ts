export interface IGameInfo {
  id: number;
  name: string;
  image: string;
  type: string;
  manual: string;
  enable: boolean;
}

export interface IGameInfoRequest {
  name: string;
  image: string;
  manual: string;
  enable: boolean;
}

export interface IGameInfoResponse {
  id: number;
  name: string;
  image: string;
  type: string;
  manual: string;
  enable: boolean;
}
