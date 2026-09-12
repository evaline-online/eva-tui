import { TerminalRenderer } from "../src/core/terminal-renderer";
import { Box } from "../src/widgets/box";
import { Text } from "../src/widgets/text";
import { Button } from "../src/widgets/button";
import { Table } from "../src/widgets/table";
import { Progress } from "../src/widgets/progress";
import { Spinner } from "../src/widgets/spinner";
import chalk from "chalk";

const renderer = new TerminalRenderer();

async function run(): Promise<void> {
  renderer.clear();
  renderer.render(chalk.bold("Dashboard Example\n") + "\n");

  const box = new Box(renderer).pos(0, 0).size(50, 6).padding(2).border(true).title("Status").render();

  const table = new Table(renderer)
    .pos(0, 8)
    .headers(["Component", "Status"])
    .rows([["TUI Engine", "ok"], ["Backend", "ok"], ["UI", "ready"]])
    .render();

  const progress = new Progress(renderer)
    .pos(0, 15)
    .width(40)
    .label("Build")
    .setProgress(60)
    .render();

  const spinner = new Spinner(renderer).pos(0, 18).label("Waiting...");
  spinner.start();
  await new Promise((r) => setTimeout(r, 1200));
  spinner.stop();
}

run();