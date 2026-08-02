import {
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { Pressable, type PressableProps } from "react-native";

import { cn } from "../../lib/cn";
import { useTheme } from "../../theme/ThemeProvider";
import { Text } from "./Text";

const variantClasses = {
  primary:
    "border border-primary bg-primary active:border-primaryPressed active:bg-primaryPressed",
  secondary:
    "border border-border bg-secondary active:border-secondaryPressed active:bg-secondaryPressed",
  ghost: "border border-transparent bg-transparent active:bg-secondaryHover",
  danger:
    "border border-danger bg-danger active:border-dangerPressed active:bg-dangerPressed",
} as const;

const labelClasses = {
  primary: "text-primaryForeground",
  secondary: "text-secondaryForeground",
  ghost: "text-text",
  danger: "text-dangerForeground",
} as const;

const sizeClasses = {
  sm: "min-h-10 px-md py-xs",
  md: "min-h-12 px-lg py-sm",
  lg: "min-h-14 px-xl py-md",
} as const;

const iconSizes = {
  sm: 16,
  md: 18,
  lg: 20,
} as const;

const iconTones = {
  primary: "primaryForeground",
  secondary: "secondaryForeground",
  ghost: "text",
  danger: "dangerForeground",
} as const;

type ButtonVariant = keyof typeof variantClasses;
type ButtonSize = keyof typeof sizeClasses;
type ButtonIconElement = ReactElement<{
  size?: number;
  tintColor?: string;
  color?: string;
}>;

type ButtonProps = PressableProps & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leadingIcon?: ButtonIconElement;
  trailingIcon?: ButtonIconElement;
  className?: string;
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  leadingIcon,
  trailingIcon,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const { colors } = useTheme();

  const content =
    typeof children === "string" ? (
      <Text
        variant="labelMd"
        className={cn("font-semibold", labelClasses[variant])}
      >
        {children}
      </Text>
    ) : (
      children
    );

  const iconDefaults = {
    size: iconSizes[size],
    tintColor: colors[iconTones[variant]],
  };

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      className={cn(
        "flex-row items-center justify-center gap-sm rounded-control active:scale-[0.98]",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        disabled && "opacity-50",
        className,
      )}
      {...props}
    >
      {renderIcon(leadingIcon, iconDefaults)}
      {content}
      {renderIcon(trailingIcon, iconDefaults)}
    </Pressable>
  );
}

function renderIcon(
  icon: ButtonIconElement | undefined,
  defaults: { size: number; tintColor: string },
) {
  if (!icon || !isValidElement(icon)) {
    return icon;
  }

  return cloneElement(icon, {
    size: icon.props.size ?? defaults.size,
    tintColor: icon.props.tintColor ?? defaults.tintColor,
    color: icon.props.color ?? defaults.tintColor,
  });
}
