import { TerminalRenderer } from "../src/core/terminal-renderer";
import { Button } from "../src/widgets/button";
import { Text } from "../src/widgets/text";
import { Progress } from "../src/widgets/progress";
import { Spinner } from "../src/widgets/spinner";
import { Box } from "../src/widgets/box";
import chalk from "chalk";

const renderer = new TerminalRenderer();

async function run(): Promise<void> {
  renderer.clear();
  renderer.render(chalk.bgBlue.white("Welcome Screen\n") + "\n");
  const box = new Box(renderer).pos(0, 1).size(40, 8).border(true).title("Login").render();
  const user = new Text(renderer).pos(2, 3).content("User:").render();
  const pass = new Text(renderer).pos(2, 5).content("Pass:").render();
  const submit = new Button(renderer).pos(2, 7).label("Submit").render();

  const spinner = new Spinner(renderer).pos(0, 12).label("Connecting...");
  spinner.start();
  await new Promise((r) => setTimeout(r, 1500));
  spinner.stop();

  const progress = new Progress(renderer)
    .pos(0, 14)
    .width(40)
    .label("Progress")
    .setProgress(85)
    .render();
}

run();