import { mockApiClient } from "@/lib/api/client";
import type { ApiResult } from "@/lib/api/types";

export type Article = {
  id: string;
  createdAt: number;
  title: string;
  subtitle: string;
  desc: string;
  votes: number;
};

export type ArticleSortField =
  | "id"
  | "createdAt"
  | "title"
  | "subtitle"
  | "desc"
  | "votes";

export type ArticleSortOrder = "asc" | "desc";

export type ArticleDraft = {
  title: string;
  subtitle: string;
  desc: string;
  votes: number;
};

export type ArticleListQuery = {
  search?: string;
  filter?: string;
  title?: string;
  subtitle?: string;
  desc?: string;
  page?: number;
  limit?: number;
  sortBy?: ArticleSortField;
  order?: ArticleSortOrder;
};

export const articleEndpoints = {
  list: "/articles",
  detail: (id: string) => `/articles/${id}`,
};

export async function getArticles(
  params: ArticleListQuery = {},
): Promise<ApiResult<Article[]>> {
  return mockApiClient.request<Article[]>(articleEndpoints.list, { params });
}

export async function createArticle(
  payload: ArticleDraft,
): Promise<ApiResult<Article>> {
  return mockApiClient.request<Article>(articleEndpoints.list, {
    method: "POST",
    body: payload,
  });
}

export async function updateArticle(
  id: string,
  payload: ArticleDraft,
): Promise<ApiResult<Article>> {
  return mockApiClient.request<Article>(articleEndpoints.detail(id), {
    method: "PUT",
    body: payload,
  });
}

export async function deleteArticle(
  id: string,
): Promise<ApiResult<Article | undefined>> {
  return mockApiClient.request<Article | undefined>(
    articleEndpoints.detail(id),
    {
      method: "DELETE",
    },
  );
}
