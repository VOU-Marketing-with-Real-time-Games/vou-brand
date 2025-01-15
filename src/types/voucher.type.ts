export interface IVoucher {
  code: string;
  qrCode: string;
  image: string;
  description: string;
  discount: number;
  expirationDate: string;
  createdDate: string;
  brandId: number;
}

export interface IVoucherCreate {
  code: string;
  image: string;
  description: string;
  discount: number;
  expirationDate: string;
  brandId: number;
  campaignId: number;
  total: number;
}

export interface IVoucherUpdate {
  image?: string;
  description?: string;
  discount?: number;
  expirationDate?: string;
  status?: "ACTIVE" | "EXPIRED" | "REDEEMED";
}
