import { TerminalRenderer } from "./core/terminal-renderer";
import { Box } from "./widgets/box";
import { Text } from "./widgets/text";
import { Button } from "./widgets/button";
import { List } from "./widgets/list";
import { Table } from "./widgets/table";
import { Progress } from "./widgets/progress";
import { Spinner } from "./widgets/spinner";
import chalk from "chalk";
import figlet from "figlet";

const renderer = new TerminalRenderer();

function header(title: string): void {
  renderer.clear();
  const banner = figlet.textSync(title, {
    font: "Standard",
    horizontalLayout: "default",
  });
  renderer.render(chalk.yellow(banner) + "\n");
}

async function demo(): Promise<void> {
  header("eva-tui");

  // Banner button
  const startBtn = new Button(renderer).pos(10, 2).label("Start");
  startBtn.render();

  // Header text
  const headerText = new Text(renderer)
    .pos(10, 6)
    .content("EvaLine Universal TUI Framework")
    .bold(true);
  headerText.render();

  // Table of components
  const table = new Table(renderer)
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
    ]);
  table.render();

  // Progress bars
  const progress1 = new Progress(renderer)
    .pos(10, 22)
    .width(40)
    .label("CPU")
    .setProgress(45);
  progress1.render();

  const progress2 = new Progress(renderer)
    .pos(10, 24)
    .width(40)
    .label("Memory")
    .setProgress(72);
  progress2.render();

  // Spinner demo (short)
  const spinner = new Spinner(renderer).pos(10, 27).label("Connecting");
  spinner.start();
  await new Promise((r) => setTimeout(r, 1500));
  spinner.stop();

  // List
  const list = new List(renderer)
    .pos(10, 31)
    .items(["eva-face-3d", "eva-hub", "evaline-chat", "eva-git", "eva-tui"])
    .select(2);
  list.render();
}

async function main(): Promise<void> {
  try {
    await demo();
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

main();