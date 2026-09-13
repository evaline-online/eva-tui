import YAML from "yaml";
import { LayoutNode } from "./layout";
import { WebElement } from "./web-renderer";

export type RendererFormat = "txt" | "md" | "ansi" | "ascii" | "unicode" | "json" | "yaml" | "html" | "css" | "js";

export interface LayoutDocument {
  theme?: string;
  width?: number;
  height?: number;
  nodes: LayoutNode[];
}

export interface WebDocument {
  theme?: string;
  width?: number;
  height?: number;
  elements: WebElement[];
}

export function parseLayout(input: string, format: RendererFormat = "yaml"): LayoutDocument {
  if (format === "json") return JSON.parse(input) as LayoutDocument;
  if (format === "txt" || format === "md" || format === "ansi" || format === "ascii" || format === "unicode") {
    return { width: 80, height: 24, nodes: [{ type: "text", x: 0, y: 0, props: { content: input } }] };
  }
  return YAML.parse(input) as LayoutDocument;
}

export function parseWeb(input: string, format: RendererFormat = "yaml"): WebDocument {
  if (format === "json") return JSON.parse(input) as WebDocument;
  if (format === "txt" || format === "md" || format === "ansi" || format === "ascii" || format === "unicode") {
    return { width: 800, height: 400, elements: [{ type: "text", x: 0, y: 0, text: input }] };
  }
  return YAML.parse(input) as WebDocument;
}

export function renderToFormat(document: LayoutDocument, format: RendererFormat): string {
  if (format === "json") return JSON.stringify(document, null, 2);
  if (format === "yaml") return YAML.stringify(document);
  if (format === "html" || format === "css" || format === "js") return "";
  return document.nodes.map((node) => JSON.stringify(node)).join("\n");
}
