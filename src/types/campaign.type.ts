export interface ICampaignRequestDto {
  name: string;
  image: string;
  field: string;
  startDate: string;
  endDate: string;
  brandId: number;
}

export interface ICampaign {
  id: number;
  name: string;
  image: string;
  field: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  createdAt: string;
  brandId: number;
  note: string;
}
