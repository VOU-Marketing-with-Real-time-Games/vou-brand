export interface ICampaignRequestDto {
  name: string;
  image: string;
  description: string;
  field: string;
  startDate: string;
  endDate: string;
  brandId: number;
  status: "ACTIVE" | "INACTIVE" | "PENDING" | "APPROVED" | "REJECTED" | "COMPLETED" | "CANCELED";
  note?: string;
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
