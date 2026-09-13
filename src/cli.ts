import { TerminalRenderer } from "./core/terminal-renderer";
import { WebRenderer } from "./core/web-renderer";
import { Box } from "./widgets/box";
import { Text } from "./widgets/text";
import { Button } from "./widgets/button";
import { List } from "./widgets/list";
import { Table } from "./widgets/table";
import { Progress } from "./widgets/progress";
import { Spinner } from "./widgets/spinner";
import chalk from "chalk";
import figlet from "figlet";
import { parseLayout, renderToFormat } from "./core/formats";
import { Layout } from "./core/layout";

const renderer = new TerminalRenderer();

function banner(title: string): void {
  renderer.clear();
  const text = figlet.textSync(title, {
    font: "Standard",
    horizontalLayout: "default",
  });
  renderer.render(chalk.yellow(text) + "\n");
}

function demo(): void {
  banner("eva-tui");

  // Banner button
  new Button(renderer).pos(10, 2).label("Start").render();

  // Header text
  new Text(renderer)
    .pos(10, 6)
    .content("EvaLine Universal TUI Framework")
    .bold(true)
    .render();

  // Table of components
  new Table(renderer)
    .pos(10, 10)
    .headers(["Widget", "Status"])
    .rows([
      ["Box", "ready"],
      ["Text", "ready"],
      ["Button", "ready"],
      ["List", "ready"],
      ["Table", "ready"],
      ["Progress", "ready"],
      ["Spinner", "ready"],
    ])
    .render();

  // Progress bars
  new Progress(renderer).pos(10, 22).width(40).label("CPU").setProgress(45).render();
  new Progress(renderer).pos(10, 24).width(40).label("Memory").setProgress(72).render();

  // Spinner demo
  const spinner = new Spinner(renderer).pos(10, 27).label("Connecting");
  spinner.start();
  setTimeout(() => spinner.stop(), 1500);

  // List
  new List(renderer)
    .pos(10, 31)
    .items(["eva-face-3d", "eva-hub", "evaline-chat", "eva-git", "eva-tui"])
    .select(2)
    .render();
}

function runLayoutDemo(): void {
  const layout = new Layout();
  layout.add({ type: "box", x: 0, y: 0, width: 60, height: 10, props: { title: "Layout Demo", border: true } });
  layout.add({ type: "text", x: 2, y: 2, props: { content: "EvaLine TUI Layout Engine", bold: true } });
  layout.add({ type: "progress", x: 2, y: 5, width: 40, props: { label: "Loading", progress: 60 } });
  layout.add({ type: "list", x: 2, y: 7, width: 40, props: { items: ["Item 1", "Item 2", "Item 3"], selected: 1 } });

  // Import createLayoutApp dynamically
  import("./core/create-layout-app").then(({ createLayoutApp }) => {
    createLayoutApp(renderer, layout);
  });
}

function parseLayoutFile(filePath: string, format: string = "yaml"): void {
  import("fs").then((fs) => {
    const content = fs.readFileSync(filePath, "utf-8");
    const doc = parseLayout(content, format as any);
    console.log("Parsed layout:", JSON.stringify(doc, null, 2));
    const layout = new Layout();
    for (const node of doc.nodes) layout.add(node);
    import("./core/create-layout-app").then(({ createLayoutApp }) => {
      createLayoutApp(renderer, layout);
    });
  });
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const command = args[0] || "demo";

  try {
    switch (command) {
      case "demo":
        demo();
        break;
      case "layout":
        runLayoutDemo();
        break;
      case "parse":
        parseLayoutFile(args[1], args[2] || "yaml");
        break;
      case "web":
        const web = new WebRenderer();
        web.resize(1200, 800);
        web.render([{ type: "rect", x: 100, y: 100, width: 200, height: 100, fill: "#ffcc66" }]);
        console.log("HTML:", web.toHtml().slice(0, 500) + "...");
        break;
      default:
        console.log("Usage: eva-tui [demo|layout|parse <file> [format]|web]");
    }
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

main();