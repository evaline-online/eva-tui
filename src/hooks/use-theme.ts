import { useState } from "react";
import type { Theme } from "../core/theme";

export function useTheme(theme: typeof Theme): typeof Theme {
  const [current, setCurrent] = useState(theme);
  return current;
}