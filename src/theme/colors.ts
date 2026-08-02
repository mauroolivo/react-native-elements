export const neutralScale = {
  50: "#f8fafc",
  100: "#f1f5f9",
  200: "#e2e8f0",
  300: "#cbd5e1",
  400: "#94a3b8",
  500: "#64748b",
  600: "#475569",
  700: "#334155",
  800: "#1e293b",
  900: "#0f172a",
  950: "#020617",
} as const;

export const brandScale = {
  50: "#eff6ff",
  100: "#dbeafe",
  200: "#bfdbfe",
  300: "#93c5fd",
  400: "#60a5fa",
  500: "#3b82f6",
  600: "#2563eb",
  700: "#1d4ed8",
  800: "#1e40af",
  900: "#1e3a8a",
} as const;

export const semanticColors = {
  light: {
    background: neutralScale[50],
    backgroundAlt: neutralScale[100],
    surface: "#ffffff",
    surfaceAlt: neutralScale[100],
    surfaceElevated: "#ffffff",
    surfaceInverse: neutralScale[900],
    overlay: "#00000066",
    border: neutralScale[200],
    borderStrong: neutralScale[300],

    text: neutralScale[900],
    textMuted: neutralScale[600],
    textInverse: neutralScale[50],

    primary: brandScale[600],
    primaryHover: brandScale[700],
    primaryPressed: brandScale[800],
    primaryForeground: "#ffffff",

    secondary: neutralScale[200],
    secondaryHover: neutralScale[300],
    secondaryPressed: neutralScale[400],
    secondaryForeground: neutralScale[900],

    info: "#3b82f6",
    infoForeground: "#ffffff",
    success: "#16a34a",
    successForeground: "#ffffff",
    warning: "#f59e0b",
    warningForeground: "#ffffff",
    danger: "#dc2626",
    dangerHover: "#b91c1c",
    dangerPressed: "#991b1b",
    dangerForeground: "#ffffff",

    disabled: neutralScale[300],
    disabledForeground: neutralScale[500],

    focus: brandScale[500],
  },

  dark: {
    background: neutralScale[950],
    backgroundAlt: neutralScale[900],
    surface: neutralScale[900],
    surfaceAlt: neutralScale[800],
    surfaceElevated: neutralScale[800],
    surfaceInverse: neutralScale[50],
    overlay: "#00000099",
    border: neutralScale[700],
    borderStrong: neutralScale[600],

    text: neutralScale[50],
    textMuted: neutralScale[300],
    textInverse: neutralScale[950],

    primary: brandScale[400],
    primaryHover: brandScale[300],
    primaryPressed: brandScale[200],
    primaryForeground: neutralScale[950],

    secondary: neutralScale[800],
    secondaryHover: neutralScale[700],
    secondaryPressed: neutralScale[600],
    secondaryForeground: neutralScale[50],

    info: "#93c5fd",
    infoForeground: "#0c4a6e",
    success: "#4ade80",
    successForeground: "#14532d",
    warning: "#fbbf24",
    warningForeground: "#78350f",
    danger: "#f87171",
    dangerHover: "#ef4444",
    dangerPressed: "#dc2626",
    dangerForeground: "#7f1d1d",

    disabled: neutralScale[700],
    disabledForeground: neutralScale[500],

    focus: brandScale[400],
  },
} as const;

export type ThemeScheme = keyof typeof semanticColors;
export type SemanticColorName = keyof typeof semanticColors.light;

export function hexToRgbTriplet(hex: string) {
  const normalized = hex.replace("#", "").trim();
  const expanded =
    normalized.length === 3
      ? normalized
          .split("")
          .map((part) => part + part)
          .join("")
      : normalized;

  const value = Number.parseInt(expanded, 16);
  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;

  return `${red} ${green} ${blue}`;
}

export function toNativeWindVariables(
  colors: Record<SemanticColorName, string>,
) {
  return Object.fromEntries(
    Object.entries(colors).map(([name, value]) => [
      `--${name.replace(/([A-Z])/g, "-$1").toLowerCase()}`,
      hexToRgbTriplet(value),
    ]),
  );
}
