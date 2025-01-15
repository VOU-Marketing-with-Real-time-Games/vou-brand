export interface IBrandRequestDto {
  name: string;
  field: string;
}

export interface IBrand {
  id: number;
  name: string;
  field: string;
  enabled: boolean;
  creator: number;
  createdAt: string;
}
