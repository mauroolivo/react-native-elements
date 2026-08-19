import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";

import {
  Button,
  LoadingOverlayProvider,
  Screen,
  Text,
  withLoader,
} from "@/components/ui";
import { ArticleForm } from "@/features/articles/components/ArticleForm";
import { useArticle, useSaveArticle } from "@/features/articles/hooks";
import { useTranslation } from "react-i18next";

export default function EditArticleScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const articleId = typeof id === "string" ? id : undefined;
  const isEditMode = Boolean(articleId);
  const { t } = useTranslation("shared");
  const articleQuery = useArticle(articleId);
  const saveArticle = useSaveArticle();

  if (isEditMode && articleQuery.isPending) {
    return (
      <Screen>
        <StateView>
          <ActivityIndicator size="large" />
          <Text className="mt-md" tone="muted">
            Loading article...
          </Text>
        </StateView>
      </Screen>
    );
  }

  if (isEditMode && articleQuery.isError) {
    return (
      <Screen>
        <StateView>
          <Text variant="titleMd" tone="danger">
            Could not load article
          </Text>
          <Text className="mt-sm text-center" tone="muted">
            {articleQuery.error.message}
          </Text>
          <Button className="mt-lg" onPress={() => router.back()}>
            Close
          </Button>
        </StateView>
      </Screen>
    );
  }

  return (
    <Screen>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerClassName="gap-lg p-lg pb-2xl"
          keyboardShouldPersistTaps="handled"
        >
          <ArticleForm
            initialValues={articleQuery.data}
            isEditMode={isEditMode}
            isSaving={saveArticle.isPending}
            serverError={saveArticle.error?.message}
            onCancel={() => router.back()}
            onSubmit={async (values) => {
              await withLoader(t("saving"), () =>
                saveArticle.mutateAsync({
                  id: articleId,
                  payload: values,
                }),
              );
              router.back();
            }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      <LoadingOverlayProvider />
    </Screen>
  );
}

function StateView({ children }: { children: React.ReactNode }) {
  return (
    <View className="flex-1 items-center justify-center px-lg">{children}</View>
  );
}
