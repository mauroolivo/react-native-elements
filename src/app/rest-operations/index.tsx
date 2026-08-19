import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  View,
} from "react-native";

import { Button, Card, Screen, Text, withLoader } from "@/components/ui";
import {
  useDeleteArticle,
  useInfiniteArticles,
} from "@/features/articles/hooks";
import { AppSymbolIcon, buttonIcons } from "@/theme/icons/AppIcons";

export default function RestOperationsScreen() {
  const router = useRouter();
  const { t } = useTranslation("shared");
  const articlesQuery = useInfiniteArticles();
  const deleteArticleMutation = useDeleteArticle();

  const articles = articlesQuery.data?.pages.flat() ?? [];
  const isInitialLoading = articlesQuery.isPending && articles.length === 0;
  const isEmpty = !articlesQuery.isPending && articles.length === 0;

  if (isInitialLoading) {
    return (
      <Screen edges={["left", "right", "bottom"]}>
        <StateView>
          <ActivityIndicator size="large" />
          <Text className="mt-md" tone="muted">
            Loading articles...
          </Text>
        </StateView>
      </Screen>
    );
  }

  if (articlesQuery.isError && articles.length === 0) {
    return (
      <Screen edges={["left", "right", "bottom"]}>
        <StateView>
          <Text variant="titleMd" tone="danger">
            Could not load articles
          </Text>
          <Text className="mt-sm text-center" tone="muted">
            {articlesQuery.error.message}
          </Text>
          <Button
            className="mt-lg"
            onPress={() => {
              void articlesQuery.refetch();
            }}
          >
            Try again
          </Button>
        </StateView>
      </Screen>
    );
  }

  return (
    <Screen edges={["left", "right", "bottom"]}>
      <View className="flex-1 px-lg">
        <FlatList
          data={articles}
          showsVerticalScrollIndicator={true}
          keyExtractor={(article) => article.id}
          renderItem={({ item }) => (
            <Card className="mb-md">
              <Text variant="titleMd">{item.title}</Text>
              <Text className="mt-xs" tone="muted">
                {item.subtitle}
              </Text>
              <Text className="mt-sm" numberOfLines={3}>
                {item.desc}
              </Text>
              <Text className="mt-md" variant="labelSm" tone="muted">
                {item.votes} votes
              </Text>
              <View className="mt-md flex-row justify-end gap-sm">
                <Button
                  accessibilityLabel={t("editArticle")}
                  size="sm"
                  variant="secondary"
                  className="px-sm"
                  onPress={() =>
                    router.push({
                      pathname: "/rest-operations/edit",
                      params: { id: item.id },
                    })
                  }
                >
                  <AppSymbolIcon name={buttonIcons.edit} size={18} />
                </Button>
                <Button
                  accessibilityLabel={t("delete")}
                  size="sm"
                  variant="danger"
                  className="px-sm"
                  disabled={
                    deleteArticleMutation.isPending &&
                    deleteArticleMutation.variables === item.id
                  }
                  onPress={() => {
                    Alert.alert(
                      t("deleteArticleTitle"),
                      t("deleteArticleConfirm", { title: item.title }),
                      [
                        { text: t("cancel"), style: "cancel" },
                        {
                          text: t("delete"),
                          style: "destructive",
                          onPress: () => {
                            void withLoader(t("deleting"), () =>
                              deleteArticleMutation.mutateAsync(item.id),
                            );
                          },
                        },
                      ],
                    );
                  }}
                >
                  <AppSymbolIcon name={buttonIcons.delete} size={18} />
                </Button>
              </View>
            </Card>
          )}
          ListEmptyComponent={
            isEmpty ? (
              <StateView>
                <Text variant="titleMd">No articles yet</Text>
                <Text className="mt-sm text-center" tone="muted">
                  There are no remote articles to display.
                </Text>
              </StateView>
            ) : null
          }
          contentContainerClassName={isEmpty ? "flex-1" : undefined}
          onEndReached={() => {
            if (
              articlesQuery.hasNextPage &&
              !articlesQuery.isFetchingNextPage
            ) {
              void articlesQuery.fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl
              refreshing={
                articlesQuery.isRefetching && !articlesQuery.isFetchingNextPage
              }
              onRefresh={() => {
                void articlesQuery.refetch();
              }}
            />
          }
          ListFooterComponent={
            articlesQuery.isFetchingNextPage ? (
              <View className="items-center py-lg">
                <ActivityIndicator />
              </View>
            ) : null
          }
        />
      </View>
    </Screen>
  );
}

function StateView({ children }: { children: React.ReactNode }) {
  return (
    <View className="flex-1 items-center justify-center px-lg">{children}</View>
  );
}
