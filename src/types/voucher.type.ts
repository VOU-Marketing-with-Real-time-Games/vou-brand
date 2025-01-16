export interface IVoucher {
  code: string;
  qrCode: string;
  image: string;
  description: string;
  discount: number;
  expiredDate: string;
  createdDate: string;
  brandId: number;
}

export interface IVoucherCreate {
  code: string;
  image: string;
  description: string;
  discount: number;
  expiredDate: string;
  brandId: number;
  campaignId: number;
  total: number;
}

export interface IVoucherUpdate {
  image?: string;
  description?: string;
  discount?: number;
  expiredDate?: string;
  status?: "ACTIVE" | "EXPIRED" | "REDEEMED";
}
