export interface LayoutNode {
  type: "box" | "text" | "button" | "list" | "table" | "progress" | "spinner";
  x: number;
  y: number;
  width?: number;
  height?: number;
  props: Record<string, unknown>;
}

export class Layout {
  private nodes: LayoutNode[] = [];

  add(node: LayoutNode): this {
    this.nodes.push(node);
    return this;
  }

  layout(): LayoutNode[] {
    return this.nodes;
  }

  clear(): this {
    this.nodes = [];
    return this;
  }
}