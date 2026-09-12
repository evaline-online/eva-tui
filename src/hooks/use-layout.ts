import { useState } from "react";

export function useLayout(width: number, height: number) {
  const [layout, setLayout] = useState({ width, height });
  return layout;
}