import { Renderer } from "../core/renderer";
import { Theme } from "../core/theme";

type ThemeType = typeof Theme.dark;

const AnsiColorCodes = {
  black: "30",
  red: "31",
  green: "32",
  yellow: "33",
  blue: "34",
  magenta: "35",
  cyan: "36",
  white: "37",
  blackBright: "90",
  redBright: "91",
  greenBright: "92",
  yellowBright: "93",
  blueBright: "94",
  magentaBright: "95",
  cyanBright: "96",
  whiteBright: "97",
  bgBlack: "40",
  bgRed: "41",
  bgGreen: "42",
  bgYellow: "43",
  bgBlue: "44",
  bgMagenta: "45",
  bgCyan: "46",
  bgWhite: "47",
} as const;

export type AnsiColor = keyof typeof AnsiColorCodes;

export class Text {
  private renderer: Renderer;
  private _theme: ThemeType = Theme.dark;
  private _x = 0;
  private _y = 0;
  private _text = "";
  private _color?: AnsiColor;
  private _bold = false;
  private _italic = false;

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

  content(txt: string): this {
    this._text = txt;
    return this;
  }

  fg(color: AnsiColor): this {
    this._color = color;
    return this;
  }

  bold(b: boolean): this {
    this._bold = b;
    return this;
  }

  italic(i: boolean): this {
    this._italic = i;
    return this;
  }

  render(): void {
    let display = this._text;
    if (this._bold) display = `\x1b[1m${display}\x1b[22m`;
    if (this._italic) display = `\x1b[3m${display}\x1b[23m`;
    if (this._color) {
      const code = AnsiColorCodes[this._color];
      display = `\x1b[${code}m${display}\x1b[39m`;
    }
    this.renderer.render(`${" ".repeat(this._x)}${display}\n`);
  }
}