import { Renderer } from "../core/renderer";
import { Theme } from "../core/theme";

type ThemeType = typeof Theme.dark;

export class Button {
  private renderer: Renderer;
  private _theme: ThemeType = Theme.dark;
  private _x = 0;
  private _y = 0;
  private _width = 20;
  private _height = 1;
  private _label = "OK";
  private _onClick?: () => void;

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

  size(w: number, h: number): this {
    this._width = w;
    this._height = h;
    return this;
  }

  label(l: string): this {
    this._label = l;
    return this;
  }

  click(handler: () => void): this {
    this._onClick = handler;
    return this;
  }

  render(): void {
    const padded = this._label.padEnd(this._width);
    const line = `+${"-".repeat(this._width)}+\n${padded}\n+${"-".repeat(this._width)}+`;
    this.renderer.render(`${" ".repeat(this._x)}${line}\n`);
  }
}