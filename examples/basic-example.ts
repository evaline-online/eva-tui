import { TerminalRenderer } from "../src/core/terminal-renderer";
import { Text } from "../src/widgets/text";
import chalk from "chalk";
import figlet from "figlet";

const renderer = new TerminalRenderer();

function run(): void {
  renderer.clear();
  const title = figlet.textSync("Example 1", { font: "Standard" });
  renderer.render(chalk.cyan(title) + "\n");
  const text = new Text(renderer).pos(0, 4).content("Hello from eva-tui!").bold(true).render();
}

run();