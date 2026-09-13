import { Theme } from "./theme";
import type { Renderer } from "./renderer";

export interface WebElement {
  type: "rect" | "text" | "line" | "circle";
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
  text?: string;
  fill?: string;
  stroke?: string;
  fontSize?: number;
  fontFamily?: string;
  bold?: boolean;
  italic?: boolean;
}

export interface WebRenderResult {
  width: number;
  height: number;
  elements: WebElement[];
  css: string;
  html: string;
  js: string;
}

export class WebRenderer implements Renderer {
  private width = 800;
  private height = 400;
  private theme: typeof Theme.dark = Theme.dark;
  private elements: WebElement[] = [];

  constructor(width = 800, height = 400) {
    this.width = width;
    this.height = height;
  }

  setTheme(theme: typeof Theme.dark): void {
    this.theme = theme;
  }

  resize(w: number, h: number): void {
    this.width = w;
    this.height = h;
  }

  render(textOrElements: string | WebElement[]): void {
    if (typeof textOrElements === "string") {
      // Legacy render with text
      this.elements = [];
    } else {
      this.elements = textOrElements;
    }
  }

  clear(): void {
    this.elements = [];
  }

  size(): { width: number; height: number } {
    return { width: this.width, height: this.height };
  }

  private escapeHtml(s: string): string {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  private hexToRgb(hex: string): string {
    const c = hex.replace("#", "");
    if (c.length === 3) {
      return c.split("").map((x) => x + x).map((h) => parseInt(h, 16)).join(",");
    }
    return c.match(/.{2}/g)?.map((h) => parseInt(h, 16)).join(",") ?? "";
  }

  toHtml(): string {
    const bg = this.theme.background;
    const fg = this.theme.foreground;
    const accent = this.theme.accent;
    const body = this.elements.map((el) => {
      const style: string[] = [];
      if (el.type === "rect") {
        style.push(`position:absolute;left:${el.x}px;top:${el.y}px;width:${el.width}px;height:${el.height}px;background:${el.fill || fg};`);
      } else if (el.type === "line") {
        style.push(`position:absolute;left:${el.x}px;top:${el.y}px;width:${el.width}px;height:${el.height}px;background:${el.fill || accent};`);
      } else if (el.type === "circle") {
        const r = el.radius ?? 5;
        style.push(`position:absolute;left:${el.x - r}px;top:${el.y - r}px;width:${r * 2}px;height:${r * 2}px;border-radius:50%;background:${el.fill || accent};`);
      } else if (el.type === "text") {
        style.push(`position:absolute;left:${el.x}px;top:${el.y}px;color:${el.fill || fg};font-size:${el.fontSize ?? 14}px;font-family:${el.fontFamily ?? "monospace"};`);
      }
      return `<div style="${style.join(";")}">${el.text ? this.escapeHtml(el.text) : ""}</div>`;
    }).join("\n");

    return `<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<title>eva-tui Web Renderer</title>\n<style>\nbody { margin:0; background:${bg}; color:${fg}; font-family:monospace; }\n#root { position:relative; width:${this.width}px; height:${this.height}px; }\n</style>\n</head>\n<body>\n<div id="root">\n${body}\n</div>\n</body>\n</html>`;
  }

  toCss(): string {
    return `:root { --bg: ${this.theme.background}; --fg: ${this.theme.foreground}; --accent: ${this.theme.accent}; }\nbody { background:var(--bg); color:var(--fg); font-family:monospace; }\n#root { width:${this.width}px; height:${this.height}px; margin:0 auto; position:relative; }`;
  }

  toJs(): string {
    return `// eva-tui WebRenderer runtime\nconst root = document.getElementById("root");\nfunction render() { /* WebRenderer state managed by eva-tui */ }\nwindow.addEventListener("resize", render);\nrender();`;
  }

  toCanvas(): string {
    const rgbBg = this.hexToRgb(this.theme.background);
    const rgbFg = this.hexToRgb(this.theme.foreground);
    return `const canvas = document.createElement("canvas");\ncanvas.width = ${this.width};\ncanvas.height = ${this.height};\nconst ctx = canvas.getContext("2d");\nctx.fillStyle = "rgb(${rgbBg})";\nctx.fillRect(0, 0, ${this.width}, ${this.height});\nctx.fillStyle = "rgb(${rgbFg})";\nctx.font = "14px monospace";\n`;
  }

  toJSON(): WebRenderResult {
    return { width: this.width, height: this.height, elements: this.elements, css: this.toCss(), html: this.toHtml(), js: this.toJs() };
  }
}
