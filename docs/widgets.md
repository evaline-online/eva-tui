# Widgets Reference

## Box

```typescript
new Box(renderer)
  .pos(x, y)
  .size(width, height)
  .padding(2)
  .margin(1)
  .title("My Box")
  .border(true)
  .render();
```

## Text

```typescript
new Text(renderer)
  .pos(x, y)
  .content("Hello, world!")
  .bold(true)
  .fg("green")
  .render();
```

## Button

```typescript
new Button(renderer)
  .pos(x, y)
  .size(20, 1)
  .label("OK")
  .render();
```

## List

```typescript
new List(renderer)
  .pos(x, y)
  .items(["a", "b", "c"])
  .select(1)
  .render();
```

## Table

```typescript
new Table(renderer)
  .pos(x, y)
  .headers(["ID", "Name"])
  .rows([[1, "Eva"], [2, "Line"]])
  .render();
```

## Progress

```typescript
new Progress(renderer)
  .pos(x, y)
  .width(40)
  .label("Loading")
  .setProgress(75)
  .render();
```

## Spinner

```typescript
const spinner = new Spinner(renderer).pos(x, y).label("Loading");
spinner.start();
// ... async work ...
spinner.stop();
```