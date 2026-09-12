import { Renderer } from "../core/renderer";
import { Theme } from "../core/theme";
import chalk from "chalk";

type ThemeType = typeof Theme.dark;

export class Spinner {
  private renderer: Renderer;
  private _theme: ThemeType = Theme.dark;
  private _x = 0;
  private _y = 0;
  private _frames = ["|", "/", "-", "\\"];
  private _frameIndex = 0;
  private _interval: NodeJS.Timeout | null = null;
  private _label = "Loading";

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

  label(l: string): this {
    this._label = l;
    return this;
  }

  start(): this {
    if (this._interval) return this;
    this._frameIndex = 0;
    this._interval = setInterval(() => {
      this._frameIndex = (this._frameIndex + 1) % this._frames.length;
      this.render();
    }, 120);
    return this;
  }

  stop(): this {
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }
    this.renderer.render("\n");
    return this;
  }

  render(): void {
    const frame = this._frames[this._frameIndex];
    const line = `${" ".repeat(this._x)}${chalk.cyan(this._label)} ${frame}`;
    this.renderer.render(line + "\r");
  }
}