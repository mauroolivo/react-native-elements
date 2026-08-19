import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, ScrollView, View } from "react-native";

import { Screen, Text } from "@/components/ui";
import { useArticle } from "@/features/articles/hooks";

export default function ArticleDetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const articleId = typeof id === "string" ? id : undefined;
  const articleQuery = useArticle(articleId);

  if (articleQuery.isPending) {
    return (
      <Screen edges={["left", "right", "bottom"]}>
        <StateView>
          <ActivityIndicator size="large" />
          <Text className="mt-md" tone="muted">
            Loading article...
          </Text>
        </StateView>
      </Screen>
    );
  }

  if (articleQuery.isError || !articleQuery.data) {
    return (
      <Screen edges={["left", "right", "bottom"]}>
        <StateView>
          <Text variant="titleMd" tone="danger">
            Could not load article
          </Text>
          <Text className="mt-sm text-center" tone="muted">
            {articleQuery.error?.message ?? "Article not found"}
          </Text>
        </StateView>
      </Screen>
    );
  }

  const article = articleQuery.data;

  return (
    <Screen edges={["left", "right", "bottom"]}>
      <ScrollView contentContainerClassName="gap-lg p-lg">
        <View className="gap-xs">
          <Text variant="headlineMd">{article.title}</Text>
          <Text variant="titleMd" tone="muted">
            {article.subtitle}
          </Text>
        </View>

        <View className="gap-xs">
          <Text variant="labelMd" tone="muted">
            Description
          </Text>
          <Text>{article.desc}</Text>
        </View>

        <View className="gap-xs">
          <Text variant="labelMd" tone="muted">
            Votes
          </Text>
          <Text>{article.votes}</Text>
        </View>

        <View className="gap-xs">
          <Text variant="labelMd" tone="muted">
            Article ID
          </Text>
          <Text selectable={true}>{article.id}</Text>
        </View>

        <View className="gap-xs">
          <Text variant="labelMd" tone="muted">
            Created
          </Text>
          <Text>{new Date(article.createdAt).toLocaleString()}</Text>
        </View>
      </ScrollView>
    </Screen>
  );
}

function StateView({ children }: { children: React.ReactNode }) {
  return (
    <View className="flex-1 items-center justify-center px-lg">{children}</View>
  );
}
