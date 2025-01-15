// src/types/gameCampaign.type.ts
export interface IGameCampaign {
  id: number;
  campaignId: number;
  gameInfoId: number;
  gameId: number;
}

export interface IGameCampaignCreate {
  campaignId: number;
  gameInfoId: number;
  gameId: number;
}

export interface IGameCampaignUpdate {
  campaignId?: number;
  gameInfoId?: number;
  gameId?: number;
}