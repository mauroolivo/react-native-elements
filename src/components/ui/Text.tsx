import {
  Text as RNText,
  type TextProps as RNTextProps,
  useWindowDimensions,
} from "react-native";

import { cn } from "../../lib/cn";
import { typography } from "../../theme/typography";

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

const variantLineHeights = {
  headlineLg: typography.headlineLg.lineHeight,
  headlineMd: typography.headlineMd.lineHeight,
  titleLg: typography.titleLg.lineHeight,
  titleMd: typography.titleMd.lineHeight,
  bodyLg: typography.bodyLg.lineHeight,
  bodyMd: typography.bodyMd.lineHeight,
  bodySm: typography.bodySm.lineHeight,
  labelMd: typography.labelMd.lineHeight,
  labelSm: typography.labelSm.lineHeight,
  caption: typography.caption.lineHeight,
  footnote: typography.footnote.lineHeight,
  overline: typography.overline.lineHeight,
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
  style,
  allowFontScaling = true,
  ...props
}: TextProps) {
  const { fontScale } = useWindowDimensions();
  const effectiveFontScale = allowFontScaling ? fontScale : 1;
  const lineHeight = Math.round(
    variantLineHeights[variant] * effectiveFontScale,
  );

  return (
    <RNText
      allowFontScaling={allowFontScaling}
      className={cn(variantClasses[variant], toneClasses[tone], className)}
      style={[{ lineHeight }, style]}
      {...props}
    />
  );
}
