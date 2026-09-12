import chalk from "chalk";
import { Theme } from "./theme";
import type { Renderer } from "./renderer";

export class WebRenderer implements Renderer {
  private width = 800;
  private height = 400;
  private theme: typeof Theme.dark = Theme.dark;

  setTheme(theme: typeof Theme.dark): void {
    this.theme = theme;
  }

  resize(w: number, h: number): void {
    this.width = w;
    this.height = h;
  }

  render(text: string): void {
    process.stdout.write(
      chalk.white(`[WebRenderer] ${this.width}x${this.height}: ${text}`) + "\n"
    );
  }

  clear(): void {
    process.stdout.write("\x1b[H\x1b[2J");
  }

  size(): { width: number; height: number } {
    return { width: this.width, height: this.height };
  }
}