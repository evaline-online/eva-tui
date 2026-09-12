import { Renderer } from "./renderer";
import { Layout } from "./layout";
import { Box } from "../widgets/box";
import { Text } from "../widgets/text";
import { Button } from "../widgets/button";
import { List } from "../widgets/list";
import { Table } from "../widgets/table";
import { Progress } from "../widgets/progress";
import { Spinner } from "../widgets/spinner";

export function createLayoutApp(renderer: Renderer, layout: Layout): void {
  for (const node of layout.layout()) {
    switch (node.type) {
      case "box": {
        const box = new Box(renderer)
          .at(node.x, node.y)
          .size(node.width ?? 40, node.height ?? 1);
        if (node.props.title) box.title(String(node.props.title));
        if (node.props.border) box.border(true);
        box.render();
        break;
      }
      case "text": {
        const text = new Text(renderer)
          .pos(node.x, node.y)
          .content(String(node.props.content ?? ""))
          .bold(Boolean(node.props.bold));
        if (node.props.color) text.fg(String(node.props.color) as never);
        text.render();
        break;
      }
      case "button": {
        const button = new Button(renderer)
          .pos(node.x, node.y)
          .size(node.width ?? 20, node.height ?? 1)
          .label(String(node.props.label ?? "OK"));
        button.render();
        break;
      }
      case "list": {
        const list = new List(renderer)
          .pos(node.x, node.y)
          .items(Array.isArray(node.props.items) ? (node.props.items as string[]) : [])
          .select(Number(node.props.selected ?? -1));
        list.render();
        break;
      }
      case "table": {
        const table = new Table(renderer)
          .pos(node.x, node.y)
          .headers(Array.isArray(node.props.headers) ? (node.props.headers as string[]) : [])
          .rows(Array.isArray(node.props.rows) ? (node.props.rows as string[][]) : []);
        table.render();
        break;
      }
      case "progress": {
        const progress = new Progress(renderer)
          .pos(node.x, node.y)
          .width(node.width ?? 40)
          .label(String(node.props.label ?? ""))
          .setProgress(Number(node.props.progress ?? 0));
        progress.render();
        break;
      }
      case "spinner": {
        const spinner = new Spinner(renderer)
          .pos(node.x, node.y)
          .label(String(node.props.label ?? "Loading"));
        spinner.start();
        spinner.stop();
        break;
      }
    }
  }
}