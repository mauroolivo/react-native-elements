import { useRouter } from "expo-router";
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    View,
} from "react-native";

import { Button, Card, Screen, Text } from "@/components/ui";
import { useInfiniteArticles } from "@/features/articles/hooks";

export default function RestOperationsScreen() {
  const router = useRouter();
  const articlesQuery = useInfiniteArticles();

  const articles = articlesQuery.data?.pages.flat() ?? [];
  const isInitialLoading = articlesQuery.isPending && articles.length === 0;
  const isEmpty = !articlesQuery.isPending && articles.length === 0;

  if (isInitialLoading) {
    return (
      <Screen>
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
      <Screen>
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
    <Screen>
      <View className="flex-1 px-lg pt-lg">
        <View className="mb-lg flex-row items-center justify-between gap-md">
          <View className="flex-1">
            <Text variant="headlineMd">Rest Operations</Text>
            <Text className="mt-xs" tone="muted">
              Articles from the remote service
            </Text>
          </View>
          <Button size="sm" onPress={() => router.push("/rest-operations/new")}>
            Add article
          </Button>
        </View>

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
