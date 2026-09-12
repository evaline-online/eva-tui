# Development Guidelines — eva-tui

## Repository Location
- **GitHub**: https://github.com/evaline-online/eva-tui
- **Local**: `/home/evabot/eva-tui`

## Setup

```bash
cd /home/evabot/eva-tui
npm install
npm run build
npm test
```

## Code Style

- TypeScript 5.6 (strict mode)
- ES Modules (`"type": "module"`)
- Prettier for formatting (if configured)
- 2-space indentation
- Single quotes where possible
- Named exports only (no default exports)
- No comments in production code unless explaining "why"

## Testing

```bash
npm test
```

Tests live in `tests/` and use `node:test` and `node:assert`.

## Linting & Typechecking

```bash
npm run typecheck
npm run lint
```

## Conventions

- **Widget names**: PascalCase (`Box`, `Text`, `Button`)
- **Builder methods**: camelCase (`setProgress`, `pos`)
- **File locations**:
  - Core: `src/core/`
  - Widgets: `src/widgets/`
  - Backends: `src/backends/` (optional extension)
  - Hooks: `src/hooks/` (React-specific)
  - Examples: `examples/`
  - Docs: `docs/`
- **Documentation**: markdown files in `docs/` and root (`README.md`, `KANBAN.md`, `CHANGELOG.md`)
- **All UTF-8**

## Adding a Widget

1. Create `src/widgets/name.ts`
2. Export a class with builder methods and a `render()` method
3. Export from `src/index.ts`
4. Add to `docs/widgets.md`
5. Add example in `examples/`
6. Add a test in `tests/`

## Adding a Backend

1. Create `src/backends/name.ts` implementing `Renderer` interface
2. Register it in `src/core/` or export directly
3. Document in `docs/backends.md`
4. Add an example using the new backend

## Fallback Rules

Always test with:
- Non-TTY stdout (piped/redirected)
- Narrow terminal width (40 columns)
- Missing color support (`TERM=dumb`)
- ASCII-only locale (`LANG=C`)

## Git Conventions

- Conventional commits: `feat:`, `fix:`, `docs:`, `test:`, `chore:`
- Branch names: `feature/xxx`, `fix/xxx`, `docs/xxx`
- Pull requests required for external contributions

## KANBAN

See `KANBAN.md` for current task board.