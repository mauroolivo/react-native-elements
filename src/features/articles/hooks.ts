import { useInfiniteQuery } from "@tanstack/react-query";

import { getArticles } from "./api";

export const ARTICLE_PAGE_SIZE = 10;

async function fetchArticlePage(page: number) {
  const result = await getArticles({
    page,
    limit: ARTICLE_PAGE_SIZE,
    sortBy: "createdAt",
    order: "desc",
  });

  if (!result.ok) {
    throw new Error(result.error);
  }

  return result.data;
}

export function useInfiniteArticles() {
  return useInfiniteQuery({
    queryKey: ["articles", "list", { limit: ARTICLE_PAGE_SIZE }],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => fetchArticlePage(pageParam),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < ARTICLE_PAGE_SIZE ? undefined : allPages.length + 1,
  });
}
