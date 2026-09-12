import { Renderer } from "../core/renderer";
import { Theme } from "../core/theme";

type ThemeType = typeof Theme.dark;

export class List {
  private renderer: Renderer;
  private _theme: ThemeType = Theme.dark;
  private _x = 0;
  private _y = 0;
  private _width = 40;
  private _items: string[] = [];
  private _selected = -1;
  private _onSelect?: (index: number) => void;

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

  items(arr: string[]): this {
    this._items = arr;
    return this;
  }

  select(index: number): this {
    this._selected = index;
    return this;
  }

  onSelect(handler: (index: number) => void): this {
    this._onSelect = handler;
    return this;
  }

  render(): void {
    const lines = this._items.map((it, i) => {
      const marker = i === this._selected ? ">>" : "  ";
      return `${" ".repeat(this._x)}${marker} ${it}`.padEnd(this._width);
    });
    this.renderer.render(lines.join("\n") + "\n");
  }
}