import { Renderer } from "../core/renderer";
import { Theme } from "../core/theme";
import chalk from "chalk";

type ThemeType = typeof Theme.dark;

export class Progress {
  private renderer: Renderer;
  private _theme: ThemeType = Theme.dark;
  private _x = 0;
  private _y = 0;
  private _width = 40;
  private _label = "";
  private _progress = 0;

  constructor(renderer: Renderer) {
    this.renderer = renderer;
  }

  setTheme(theme: ThemeType): this {
    this._theme = theme;
    return this;
  }

  pos(x: number, y: number): this {
    this._x = x;
    this._y = y;
    return this;
  }

  width(w: number): this {
    this._width = w;
    return this;
  }

  label(l: string): this {
    this._label = l;
    return this;
  }

  setProgress(p: number): this {
    this._progress = Math.max(0, Math.min(100, p));
    return this;
  }

  render(): void {
    const filled = Math.round((this._progress / 100) * this._width);
    const empty = this._width - filled;
    const bar = `${chalk.green("=".repeat(filled))}${" ".repeat(empty)}`;
    const line = `${" ".repeat(this._x)}${this._label} [${bar}] ${this._progress}%`;
    this.renderer.render(line + "\n");
  }
}