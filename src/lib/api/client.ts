import type {
    ApiFailure,
    ApiResult,
    QueryParams,
    RequestOptions,
} from "./types";

export type ApiClientConfig = {
  baseUrl: string;
  defaultHeaders?: HeadersInit;
};

export class ApiClient {
  baseUrl: string;
  defaultHeaders: HeadersInit;

  constructor({ baseUrl, defaultHeaders = {} }: ApiClientConfig) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
    this.defaultHeaders = defaultHeaders;
  }

  private buildUrl(endpoint: string, params?: QueryParams): string {
    const normalizedEndpoint = endpoint.startsWith("/")
      ? endpoint
      : `/${endpoint}`;
    const url = new URL(`${this.baseUrl}${normalizedEndpoint}`);

    Object.entries(params ?? {}).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        return;
      }

      url.searchParams.set(key, String(value));
    });

    return url.toString().replace(`${this.baseUrl}/`, `${this.baseUrl}`);
  }

  private async parseError(response: Response): Promise<ApiFailure> {
    const status = response.status;

    try {
      const payload = await response.text();
      const parsed = payload ? JSON.parse(payload) : null;
      const message =
        (typeof parsed === "object" &&
        parsed &&
        "message" in parsed &&
        typeof parsed.message === "string"
          ? parsed.message
          : typeof parsed === "object" &&
              parsed &&
              "error" in parsed &&
              typeof parsed.error === "string"
            ? parsed.error
            : undefined) ?? `Request failed with status ${status}`;

      return { ok: false, status, error: message };
    } catch {
      return {
        ok: false,
        status,
        error: `Request failed with status ${status}`,
      };
    }
  }

  async request<T>(
    endpoint: string,
    options: RequestOptions = {},
  ): Promise<ApiResult<T>> {
    const { method = "GET", body, headers, params, ...rest } = options;

    const requestHeaders = new Headers(this.defaultHeaders);
    if (headers) {
      new Headers(headers).forEach((value, key) => {
        requestHeaders.set(key, value);
      });
    }

    if (body !== undefined && !(body instanceof FormData)) {
      requestHeaders.set("Content-Type", "application/json");
    }

    const response = await fetch(this.buildUrl(endpoint, params), {
      ...rest,
      method,
      headers: requestHeaders,
      body:
        body === undefined
          ? undefined
          : typeof body === "string"
            ? body
            : JSON.stringify(body),
    });

    if (!response.ok) {
      return this.parseError(response);
    }

    const contentType = response.headers.get("content-type") ?? "";
    const payload = contentType.includes("application/json")
      ? await response.json()
      : await response.text();

    return {
      ok: true,
      status: response.status,
      data: payload as T,
    };
  }
}

export const mockApiClient = new ApiClient({
  baseUrl: "https://6a7f06623183f5fd884abacd.mockapi.io",
  defaultHeaders: {
    Accept: "application/json",
  },
});
