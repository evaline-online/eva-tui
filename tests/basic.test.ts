import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { TerminalRenderer } from "../src/core/terminal-renderer";
import { Text } from "../src/widgets/text";
import { Box } from "../src/widgets/box";
import { Button } from "../src/widgets/button";
import { List } from "../src/widgets/list";
import { Table } from "../src/widgets/table";
import { Progress } from "../src/widgets/progress";
import { Spinner } from "../src/widgets/spinner";
import { Theme } from "../src/core/theme";
import { Layout } from "../src/core/layout";
import { createLayoutApp } from "../src/core/create-layout-app";

describe("Theme", () => {
  it("exports dark and light themes", () => {
    assert.ok(Theme.dark);
    assert.ok(Theme.light);
    assert.strictEqual(Theme.dark.foreground, "#c0caf4");
  });
});

describe("TerminalRenderer", () => {
  it("creates instance with default size", () => {
    const r = new TerminalRenderer();
    const size = r.size();
    assert.strictEqual(size.width, 80);
    assert.strictEqual(size.height, 24);
    assert.ok(typeof r.render === "function");
    assert.ok(typeof r.clear === "function");
  });
});

describe("Widgets", () => {
  const r = new TerminalRenderer();

  it("instantiates Text without throwing", () => {
    assert.doesNotThrow(() => new Text(r).content("test").pos(0, 0).render());
  });

  it("instantiates Box without throwing", () => {
    assert.doesNotThrow(() => new Box(r).at(0, 0).size(40, 2).border(true).render());
  });

  it("instantiates Button without throwing", () => {
    assert.doesNotThrow(() => new Button(r).pos(0, 0).label("OK").render());
  });

  it("instantiates List without throwing", () => {
    assert.doesNotThrow(() =>
      new List(r).pos(0, 0).items(["a", "b"]).select(0).render()
    );
  });

  it("instantiates Table without throwing", () => {
    assert.doesNotThrow(() =>
      new Table(r)
        .pos(0, 0)
        .headers(["A"])
        .rows([["1"]])
        .render()
    );
  });

  it("instantiates Progress without throwing", () => {
    assert.doesNotThrow(() => new Progress(r).pos(0, 0).setProgress(50).render());
  });

  it("Progress clamps out-of-range values", () => {
    const p = new Progress(r).setProgress(150);
    // internal progress should clamp to 100
    assert.doesNotThrow(() => p.render());
  });

  it("instantiates Spinner without throwing", () => {
    const s = new Spinner(r).label("test");
    assert.doesNotThrow(() => s.render());
  });
});

describe("Layout engine", () => {
  it("appends nodes to a Layout", () => {
    const layout = new Layout();
    layout.add({ type: "text", x: 0, y: 0, props: { content: "hi" } });
    const nodes = layout.layout();
    assert.strictEqual(nodes.length, 1);
  });

  it("renders a layout app without throwing", () => {
    const r = new TerminalRenderer();
    const layout = new Layout();
    layout.add({ type: "text", x: 0, y: 0, props: { content: "test" } });
    assert.doesNotThrow(() => createLayoutApp(r, layout));
  });
});