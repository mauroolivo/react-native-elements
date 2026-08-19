import {
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    createArticle,
    getArticle,
    getArticles,
    updateArticle,
    type ArticleDraft,
} from "./api";

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

export function useArticle(id: string | undefined) {
  return useQuery({
    queryKey: ["articles", "detail", id],
    queryFn: async () => {
      if (!id) {
        throw new Error("Article id is required");
      }

      const result = await getArticle(id);
      if (!result.ok) {
        throw new Error(result.error);
      }

      return result.data;
    },
    enabled: Boolean(id),
  });
}

export function useSaveArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id?: string;
      payload: ArticleDraft;
    }) => {
      const result = id
        ? await updateArticle(id, payload)
        : await createArticle(payload);

      if (!result.ok) {
        throw new Error(result.error);
      }

      return result.data;
    },
    onSuccess: async (article) => {
      await queryClient.invalidateQueries({ queryKey: ["articles", "list"] });
      await queryClient.invalidateQueries({
        queryKey: ["articles", "detail", article.id],
      });
    },
  });
}
