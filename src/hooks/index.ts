import { useState, useEffect, useRef } from "react";
import type { Renderer } from "../core/renderer";
import { TerminalRenderer } from "../core/terminal-renderer";
import { WebRenderer } from "../core/web-renderer";

type ThemeType = typeof import("../core/theme").Theme.dark;

export function useInput(handler: (input: string, key: { ctrl: boolean; meta: boolean; return: boolean; escape: boolean }) => void): string {
  const [input, setInput] = useState("");
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onKey = (event: KeyboardEvent) => {
      const key = {
        ctrl: event.ctrlKey,
        meta: event.metaKey,
        return: event.key === "Enter",
        escape: event.key === "Escape",
      };
      handler(event.key, key);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handler]);
  return input;
}

export function useTheme(theme: ThemeType): ThemeType {
  const [current, setCurrent] = useState(theme);
  return current;
}

export function useLayout(width: number, height: number) {
  const [layout, setLayout] = useState({ width, height });
  return layout;
}

export function useRenderer(backend: "terminal" | "web" = "terminal"): Renderer {
  const rendererRef = useRef<Renderer | null>(null);

  useEffect(() => {
    if (backend === "terminal") {
      rendererRef.current = new TerminalRenderer();
    } else {
      rendererRef.current = new WebRenderer();
    }
  }, [backend]);

  return rendererRef.current as Renderer;
}

export function useWebRenderer(): WebRenderer {
  const rendererRef = useRef<WebRenderer | null>(null);

  useEffect(() => {
    rendererRef.current = new WebRenderer();
  }, []);

  return rendererRef.current as WebRenderer;
}

export function useInkRenderer() {
  const rendererRef = useRef<Renderer | null>(null);

  useEffect(() => {
    rendererRef.current = new TerminalRenderer();
  }, []);

  return rendererRef.current as Renderer;
}