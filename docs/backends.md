# Backends API

## TerminalRenderer

- Renders directly to `stdout` using ANSI/UTF-8
- `render(text: string): void`
- `clear(): void`
- `size(): { width, height }`

## WebRenderer

- Designed for browser rendering (stub here; uses Canvas in browser)
- `resize(width, height)`
- `render(text: string)`
- `clear()`

## Choosing Backend

- CLI / TUI → `TerminalRenderer`
- Web dashboard → `WebRenderer`
- Both share the same widget and layout code