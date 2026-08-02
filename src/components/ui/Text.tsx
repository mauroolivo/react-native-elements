import { Text as RNText, type TextProps as RNTextProps } from "react-native";

import { cn } from "../../lib/cn";

const variantClasses = {
  headlineLg: "text-headlineLg",
  headlineMd: "text-headlineMd",
  titleLg: "text-titleLg",
  titleMd: "text-titleMd",
  bodyLg: "text-bodyLg",
  bodyMd: "text-bodyMd",
  bodySm: "text-bodySm",
  labelMd: "text-labelMd",
  labelSm: "text-labelSm",
  caption: "text-caption",
  footnote: "text-footnote",
  overline: "text-overline uppercase",
} as const;

const toneClasses = {
  default: "text-text",
  muted: "text-textMuted",
  primary: "text-primary",
  secondary: "text-secondaryForeground",
  info: "text-info",
  infoForeground: "text-infoForeground",
  success: "text-success",
  successForeground: "text-successForeground",
  warning: "text-warning",
  warningForeground: "text-warningForeground",
  danger: "text-danger",
  dangerForeground: "text-dangerForeground",
  inverse: "text-textInverse",
} as const;

type TextVariant = keyof typeof variantClasses;
type TextTone = keyof typeof toneClasses;

type TextProps = RNTextProps & {
  variant?: TextVariant;
  tone?: TextTone;
  className?: string;
};

export function Text({
  variant = "bodyMd",
  tone = "default",
  className,
  ...props
}: TextProps) {
  return (
    <RNText
      className={cn(variantClasses[variant], toneClasses[tone], className)}
      {...props}
    />
  );
}
