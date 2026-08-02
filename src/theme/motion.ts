export const motion = {
  fast: 120,
  normal: 180,
  slow: 240,
} as const;

export type MotionToken = keyof typeof motion;
