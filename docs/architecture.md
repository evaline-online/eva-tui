# eva-tui Architecture

Universal text + web UI framework built on a small-core extensible model.

## Principles

1. **From smaller to bigger** — primitives (`Text`, `Box`) compose into larger structures (`Table`, `List`, `Dashboard`).
2. **Format-agnostic rendering** — output targets `txt`, `md`, `ansi`, `ascii`, `unicode`, `json`, `yaml`, `html`, `css`, `js`, etc. The core is format-independent; backends choose the rendering strategy.
3. **Single codebase — two environments** — Terminal (ANSI/UTF-8) and Web (Canvas/DOM) share the same widget definitions.
4. **Graceful fallbacks** — if a font or backend feature is missing, the framework degrades cleanly (plain text → unicode box drawing → ASCII/ANSI fallback).
5. **Composition over inheritance** — widgets are plain objects with builder methods, not class hierarchies.

## Architecture Overview

```
┌───────────────────────────────────────────────────────────────┐
│                        Applications                           │
│              (CLI dashboard, dev tool, web preview)           │
└──────────────────────────┬────────────────────────────────────┘
                           │ uses
┌──────────────────────────▼────────────────────────────────────┐
│                     eva-tui Core                              │
│  • Theme / Colors / Spacing / Typography                      │
│  • Layout engine (box, grid, flex)                            │
│  • Widget registry                                            │
│  • Event Bus / Input handlers                                 │
└────────────┬───────────────────────────┬──────────────────────┘
             │ renders through           │ through
┌───────────▼───────────┐   ┌───────────▼──────────────┐
│  TerminalRenderer     │   │  WebRenderer             │
│  • ANSI/UTF-8 out     │   │  • Canvas/DOM layout     │
│  • smartCSR-style     │   │  • CSS variables          │
│    redraw             │   │  • accessible markup      │
└───────────────────────┘   └──────────────────────────┘
```

## Layer Model

### 1. Data Layer
Raw strings/JSON/YAML data sources feed into widgets. The framework never assumes the format; it treats everything as text until a renderer decides how to display it.

### 2. Theme Layer
Colors, fonts, spacing, and radius are defined once in `src/core/theme.ts`. Every widget pulls from the active theme, ensuring consistent visual style across terminal and web.

### 3. Widget Layer
Primitives compose into layouts:
- `Text` → small labels, values
- `Box` → containers, panels
- `Button`, `List`, `Table` → interactive elements
- `Progress`, `Spinner` → state indicators

### 4. Backend Layer
Renderers convert widget trees into bytes:
- **Terminal** → ANSI escape codes + UTF-8 box drawing (ASCII fallback)
- **Web** → SVG/Canvas markup matching the same coordinate system

### 5. Application Layer
`createLayoutApp()` or `src/cli.ts` orchestrates the widget tree and renders it.

## Fallback Strategy

| Missing Feature | Fallback |
|-----------------|----------|
| Unicode box drawing | ASCII `+`, `-`, `|` |
| Truecolor (16M) | 256 colors |
| 256 colors | ANSI basic (8/16) |
| ANSI not supported | Plain text |
| Web Canvas missing | SVG with same layout |
| Font unavailable | System monospace |
| Async render failure | Error message rendered in error color |

## Rendering Pipeline

```
Widget tree
   ↓
Layout pass (calculate positions)
   ↓
Theme pass (resolve colors/styles)
   ↓
Backend pass (convert to bytes/strings)
   ↓
Output (stdout / DOM)
```

## Interface Types (Typescript)

```typescript
// Core
type Color = "black" | "red" | ... | "bgWhite";
interface Renderer { render(text: string): void; clear(): void; size(): Size; }
interface LayoutNode { type: string; x: number; y: number; props: Record<string, unknown>; }

// Widgets (builder pattern)
class Box { at(x,y).size(w,h).padding(p).margin(m).title(t).border(b).render(); }
class Text { pos(x,y).content(s).bold(b).fg(c).italic(i).render(); }
class Button { pos(x,y).size(w,h).label(l).click(fn).render(); }
class List { pos(x,y).items(i).select(n).onSelect(fn).render(); }
class Table { pos(x,y).headers(h).rows(r).selectRow(n).render(); }
class Progress { pos(x,y).width(w).label(l).setProgress(p).render(); }
class Spinner { pos(x,y).label(l).start().stop().render(); }
```