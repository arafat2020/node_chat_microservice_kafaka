export interface ResponseMeta {
  page: number;
  limit: number;
  total: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  meta?: ResponseMeta;
  data: T | null;
}