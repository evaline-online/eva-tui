import { Renderer } from "../core/renderer";
import { Theme } from "../core/theme";

type ThemeType = typeof Theme.dark;

export class Box {
  private renderer: Renderer;
  private _theme: ThemeType = Theme.dark;
  private _x = 0;
  private _y = 0;
  private _width = 40;
  private _height = 1;
  private _padding = 1;
  private _margin = 0;
  private _title = "";
  private _border = false;

  constructor(renderer: Renderer) {
    this.renderer = renderer;
  }

  setTheme(theme: ThemeType): this {
    this._theme = theme;
    return this;
  }

  at(x: number, y: number): this {
    this._x = x;
    this._y = y;
    return this;
  }

  size(w: number, h: number): this {
    this._width = w;
    this._height = h;
    return this;
  }

  padding(p: number): this {
    this._padding = p;
    return this;
  }

  margin(m: number): this {
    this._margin = m;
    return this;
  }

  title(t: string): this {
    this._title = t;
    return this;
  }

  border(b: boolean): this {
    this._border = b;
    return this;
  }

  render(): void {
    const lines: string[] = [];
    const effectiveWidth = this._width - this._padding * 2 - (this._border ? 2 : 0);

    if (this._title) {
      lines.push("=".repeat(effectiveWidth).slice(0, effectiveWidth));
      lines.push(`${this._title.padEnd(effectiveWidth)}${" ".repeat(effectiveWidth - this._title.length)}`);
      lines.push("=".repeat(effectiveWidth).slice(0, effectiveWidth));
    }

    for (let i = 0; i < this._height; i++) {
      const line = " ".repeat(this._padding) + " ".repeat(effectiveWidth);
      lines.push(line);
    }

    if (this._border) {
      const borderLine = "+" + "-".repeat(effectiveWidth + 2) + "+";
      lines.unshift(borderLine);
      lines.push(borderLine);
    }

    const offsetX = this._x;
    const rendered = lines.map((l) => " ".repeat(offsetX) + l);
    this.renderer.render(rendered.join("\n"));
  }
}