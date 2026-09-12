import { TerminalRenderer } from "../src/core/terminal-renderer";
import { List } from "../src/widgets/list";
import { Text } from "../src/widgets/text";
import { Button } from "../src/widgets/button";
import chalk from "chalk";

const renderer = new TerminalRenderer();

async function run(): Promise<void> {
  renderer.clear();
  renderer.render(chalk.yellow("Menu Example\n") + "\n");

  const text = new Text(renderer).pos(0, 0).content("Choose an option:").bold(true).render();

  const list = new List(renderer)
    .pos(0, 2)
    .items(["Start server", "Restart proxy", "Show logs", "Exit"])
    .select(0)
    .render();

  const button = new Button(renderer).pos(0, 8).label("Run Selected").render();
}

run();