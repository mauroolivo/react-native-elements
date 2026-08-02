import { SymbolView } from "expo-symbols";
import type { ComponentProps } from "react";
import { View, type ViewProps } from "react-native";

import { cn } from "../../lib/cn";
import { Text } from "./Text";

type CellProps = ViewProps & {
  className?: string;
};

type CellSymbolName = ComponentProps<typeof SymbolView>["name"];

type CellContentProps = ViewProps & {
  title: string;
  hint?: string;
  icon?: CellSymbolName;
  hasIcon?: boolean;
  hasDisclosure?: boolean;
  disclosureIcon?: CellSymbolName;
  iconSize?: number;
  disclosureSize?: number;
  iconTintColor?: string;
  disclosureTintColor?: string;
  className?: string;
};

function CellContent({
  title,
  hint,
  icon,
  hasIcon,
  hasDisclosure = false,
  disclosureIcon,
  iconSize = 24,
  disclosureSize = 16,
  iconTintColor,
  disclosureTintColor,
  className,
  ...props
}: CellContentProps) {
  const showIcon = hasIcon ?? Boolean(icon);
  const resolvedIcon =
    icon ??
    ({
      ios: "circle.fill",
      android: "circle",
      web: "circle",
    } satisfies CellSymbolName);
  const resolvedDisclosureIcon =
    disclosureIcon ??
    ({
      ios: "chevron.right",
      android: "chevron_right",
      web: "chevron_right",
    } satisfies CellSymbolName);

  return (
    <View className={cn("flex-row items-center gap-3", className)} {...props}>
      {showIcon ? (
        <SymbolView
          name={resolvedIcon}
          size={iconSize}
          tintColor={iconTintColor}
        />
      ) : null}

      <View className="flex-1">
        <Text variant="titleMd" tone="default">
          {title}
        </Text>
        {hint ? (
          <Text variant="bodyMd" tone="default">
            {hint}
          </Text>
        ) : null}
      </View>

      {hasDisclosure ? (
        <SymbolView
          name={resolvedDisclosureIcon}
          size={disclosureSize}
          tintColor={disclosureTintColor}
        />
      ) : null}
    </View>
  );
}

type CellComponent = ((props: CellProps) => React.JSX.Element) & {
  Content: typeof CellContent;
};

const CellBase = ({ className, ...props }: CellProps) => {
  return (
    <View
      className={cn(
        "rounded-cell border border-primary bg-surfaceAlt px-4 py-2",
        className,
      )}
      {...props}
    />
  );
};

export const Cell = Object.assign(CellBase, {
  Content: CellContent,
}) as CellComponent;
