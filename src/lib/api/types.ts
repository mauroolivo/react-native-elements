export type ApiSuccess<T> = {
  ok: true;
  status: number;
  data: T;
};

export type ApiFailure = {
  ok: false;
  status: number;
  error: string;
};

export type ApiResult<T> = ApiSuccess<T> | ApiFailure;

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type QueryParamValue = string | number | boolean | null | undefined;

export type QueryParams = Record<string, QueryParamValue>;

export type RequestOptions = Omit<RequestInit, "method" | "body"> & {
  method?: HttpMethod;
  body?: unknown;
  params?: QueryParams;
};
