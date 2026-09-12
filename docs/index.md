# eva-tui — Documentation

Universal text + web UI framework for all EvaLine/EvaBot proxy projects.

## Contents

- [README](README.md) — overview and quick start
- [KANBAN](KANBAN.md) — project board
- [Architecture](docs/architecture.md) — design principles, layers, fallbacks
- [Development](docs/development.md) — setup, code style, testing, adding widgets
- [Getting Started](docs/getting-started.md) — install and run
- [Widgets Reference](docs/widgets.md) — complete widget API
- [Themes](docs/themes.md) — theme system and palettes
- [Backends API](docs/backends.md) — terminal/web renderers
- [References](docs/references.md) — TUI/Web library links, examples, TODOs
- [CHANGELOG](CHANGELOG.md) — version history
- [Contributing](CONTRIBUTING.md) — how to contribute

## Quick Reference

| Topic | Path |
|-------|------|
| Install | `npm install` |
| Build | `npm run build` |
| Run demo | `npm run dev` |
| Tests | `npm test` |
| Typecheck | `npm run typecheck` |
| Repo | https://github.com/evaline-online/eva-tui |

## Format Support (Core Rendering Targets)

The framework is designed to render the same widget tree into multiple formats over time:

| Format | Status | Backend |
|--------|--------|---------|
| Plain text | Stable | TerminalRenderer |
| ANSI color | Stable | TerminalRenderer |
| ASCII/UTF-8 box drawing | Stable | TerminalRenderer |
| Markdown documentation | Stable | docs/* |
| JSON config | Stable | package.json, tsconfig.json |
| YAML metadata | Planned | future |
| HTML preview | Planned | WebRenderer |
| CSS themes | Planned | docs/themes.md |
| JS/TS code | Stable | src/** |
| Unicode glyphs | Stable | TerminalRenderer |

## License

UNLICENSED — EvaLine Collective.