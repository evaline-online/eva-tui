import { useEffect, useRef } from "react";
import type { Renderer } from "../core/renderer";
import { TerminalRenderer } from "../core/terminal-renderer";
import { WebRenderer } from "../core/web-renderer";

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
  // This would integrate with Ink's useStore or similar
  // For now, we'll return a mock that works with Ink's rendering
  const rendererRef = useRef<Renderer | null>(null);

  useEffect(() => {
    rendererRef.current = new TerminalRenderer();
  }, []);

  return rendererRef.current as Renderer;
}