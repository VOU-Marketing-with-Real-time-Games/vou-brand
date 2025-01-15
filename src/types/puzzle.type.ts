export interface IPuzzle {
  id: number;
  name: string;
  description: string;
  itemNum: number;
  campaignGameId: number;
  items: IItem[];
}

export interface IPuzzleCreate {
  name: string;
  description: string;
  itemNum: number;
  campaignGameId: number;
  items: IItemCreate[];
}

export interface IPuzzleUpdate {
  name?: string;
  description?: string;
  itemNum?: number;
  campaignGameId?: number;
  items?: IItemUpdate[];
}

export interface IItem {
  id: number;
  position: number;
  description: string;
  total: number;
  remainingNum: number;
}

export interface IItemCreate {
  position: number;
  description: string;
  total: number;
}

export interface IItemUpdate {
  position?: number;
  description?: string;
  total?: number;
}
