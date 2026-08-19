import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";

import { Button, Input, Text } from "@/components/ui";
import {
    articleFormSchema,
    type ArticleFormValues,
} from "@/features/articles/schema";

type ArticleFormProps = {
  initialValues?: ArticleFormValues;
  isEditMode: boolean;
  isSaving: boolean;
  serverError?: string;
  onCancel: () => void;
  onSubmit: (values: ArticleFormValues) => Promise<void>;
};

export function ArticleForm({
  initialValues,
  isEditMode,
  isSaving,
  serverError,
  onCancel,
  onSubmit,
}: ArticleFormProps) {
  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleFormSchema) as never,
    defaultValues: {
      title: "",
      subtitle: "",
      desc: "",
      votes: "" as unknown as number,
    },
  });

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }
  }, [form, initialValues]);

  return (
    <>
      <View className="flex-row items-center justify-between gap-md">
        <Text variant="headlineMd">
          {isEditMode ? "Edit article" : "New article"}
        </Text>
        <Button size="sm" variant="ghost" onPress={onCancel}>
          Cancel
        </Button>
      </View>

      <Controller
        control={form.control}
        name="title"
        render={({ field, fieldState }) => (
          <Input
            label="Title"
            placeholder="Article title"
            autoCapitalize="none"
            autoCorrect={false}
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
          />
        )}
      />
      <Controller
        control={form.control}
        name="subtitle"
        render={({ field, fieldState }) => (
          <Input
            label="Subtitle"
            placeholder="Article subtitle"
            autoCapitalize="none"
            autoCorrect={false}
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
          />
        )}
      />
      <Controller
        control={form.control}
        name="desc"
        render={({ field, fieldState }) => (
          <Input
            label="Description"
            placeholder="Article description"
            multiline={true}
            textAlignVertical="top"
            className="min-h-32"
            autoCapitalize="none"
            autoCorrect={false}
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
          />
        )}
      />
      <Controller
        control={form.control}
        name="votes"
        render={({ field, fieldState }) => (
          <Input
            label="Votes"
            placeholder="0"
            hint="Type a number"
            keyboardType="number-pad"
            value={String(field.value ?? "")}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
          />
        )}
      />

      {serverError ? (
        <Text tone="danger" accessibilityRole="alert">
          {serverError}
        </Text>
      ) : null}

      <Button
        disabled={isSaving}
        onPress={() => {
          void form.handleSubmit(onSubmit)();
        }}
      >
        {isSaving ? "Saving..." : "Save article"}
      </Button>
    </>
  );
}
