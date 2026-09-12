import { Renderer } from "./renderer";
import { Theme } from "./theme";

export class TerminalRenderer implements Renderer {
  private width = 80;
  private height = 24;
  private theme: typeof Theme.dark = Theme.dark;

  setTheme(theme: typeof Theme.dark): void {
    this.theme = theme;
  }

  render(text: string): void {
    process.stdout.write(text);
  }

  clear(): void {
    process.stdout.write("\x1b[2J\x1b[0;0H");
  }

  size(): { width: number; height: number } {
    return { width: this.width, height: this.height };
  }

  onResize?: (size: { width: number; height: number }) => void;
}