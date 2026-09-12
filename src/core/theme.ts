export const ColorPalette = {
  default: {
    foreground: "white",
    background: "#0d1117",
    accent: "#ffcc66",
    success: "#a6e3a1",
    warning: "#f9e2af",
    error: "#f38ba8",
    info: "#89b4fa",
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const FontSize = {
  sm: 12,
  md: 14,
  lg: 16,
  xl: 20,
} as const;

export const Radius = {
  sm: 4,
  md: 8,
  lg: 12,
} as const;

export const Theme = {
  light: {
    ...ColorPalette.default,
    background: "#faf0eb",
    foreground: "#4c4f69",
    accent: "#d20f34",
  },
  dark: {
    ...ColorPalette.default,
    background: "#0d1117",
    foreground: "#c0caf4",
    accent: "#ffcc66",
  },
} as const;