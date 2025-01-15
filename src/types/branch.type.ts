export interface IBranchRequestDto {
  brandId: number;
  name: string;
  address: string;
  longitude: number;
  latitude: number;
}

export interface IBranch {
  id: number;
  brandId: number;
  name: string;
  address: string;
  longitude: number;
  latitude: number;
}
