export const radius = {
  cell: 12,
  control: 14,
  card: 20,
  panel: 24,
  pill: 9999,
} as const;

export type RadiusToken = keyof typeof radius;
