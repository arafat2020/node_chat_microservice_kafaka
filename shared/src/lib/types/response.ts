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

export type PromiseMapResponse = Promise<ApiResponse<Record<string, string>>>;
export type PromiseMapResponseGeneric<T> = Promise<ApiResponse<T>>;