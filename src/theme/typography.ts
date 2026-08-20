// Summary of best practices
// Use plain unitless numbers everywhere; don't hand-roll density math.
// Leave allowFontScaling on by default; use maxFontSizeMultiplier to bound it where layout
// would break, rather than disabling it.
// Build flexible layouts (minHeight, flex, numberOfLines + ellipsizeMode as a fallback) that
// tolerate larger text rather than fixed pixel boxes.
// If you want responsive-to-screen-size design, add a moderate scale utility as a separate
// concern from accessibility scaling.

export const typography = {
  headlineLg: {
    fontSize: 36,
    lineHeight: 42,
    fontWeight: "700" as const,
    letterSpacing: -0.72,
  },
  headlineMd: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "700" as const,
    letterSpacing: -0.45,
  },
  titleLg: {
    fontSize: 22,
    lineHeight: 30,
    fontWeight: "700" as const,
    letterSpacing: -0.22,
  },
  titleMd: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600" as const,
    letterSpacing: -0.16,
  },
  bodyLg: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: "400" as const,
  },
  bodyMd: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400" as const,
  },
  bodySm: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "400" as const,
  },
  labelMd: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600" as const,
    letterSpacing: 0.14,
  },
  labelSm: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600" as const,
    letterSpacing: 0.12,
  },
  caption: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "400" as const,
  },
  footnote: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "400" as const,
  },
  overline: {
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 1.8,
    fontWeight: "700" as const,
  },
} as const;

export type TypographyToken = keyof typeof typography;
