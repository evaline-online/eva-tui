export interface Renderer {
  render(text: string): void;
  clear(): void;
  size(): { width: number; height: number };
  setTheme?(theme: unknown): void;
  onResize?: (size: { width: number; height: number }) => void;
}