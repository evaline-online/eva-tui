import { Renderer } from "../core/renderer";
import { Theme } from "../core/theme";

type ThemeType = typeof Theme.dark;

export class Table {
  private renderer: Renderer;
  private _theme: ThemeType = Theme.dark;
  private _x = 0;
  private _y = 0;
  private _width = 60;
  private _headers: string[] = [];
  private _rows: string[][] = [];
  private _selectedRow = -1;
  private _onSelect?: (row: number) => void;

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

  headers(h: string[]): this {
    this._headers = h;
    return this;
  }

  rows(r: string[][]): this {
    this._rows = r;
    return this;
  }

  selectRow(index: number): this {
    this._selectedRow = index;
    return this;
  }

  onSelect(handler: (row: number) => void): this {
    this._onSelect = handler;
    return this;
  }

  render(): void {
    const colWidths = this._headers.map((h, i) =>
      Math.max(h.length, ...this._rows.map((row) => row[i]?.length ?? 0))
    );

    const headerLine = this._headers
      .map((h, i) => h.padEnd(colWidths[i]))
      .join(" | ");
    const separator = colWidths.map((w) => "-".repeat(w)).join("+-");

    const bodyLines: string[] = [];
    bodyLines.push(`${" ".repeat(this._x)}${headerLine}`);
    bodyLines.push(`${" ".repeat(this._x)}${separator}`);

    this._rows.forEach((row) => {
      const cells = row.map((cell, cIdx) =>
        cell?.padEnd(colWidths[cIdx]) ?? ""
      );
      const line = cells.join(" | ");
      bodyLines.push(`${" ".repeat(this._x)}${line}`);
    });

    this.renderer.render(bodyLines.join("\n") + "\n");
  }
}