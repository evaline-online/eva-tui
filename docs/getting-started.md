# Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the demo:

```bash
npm run dev
```

3. Build:

```bash
npm run build
```

4. Start:

```bash
npm start
```

## Architecture

- `src/core/` — renderer abstractions (terminal, web), theme, layout
- `src/widgets/` — reusable components (Box, Text, Button, List, Table, Progress, Spinner)
- `src/hooks/` — React hooks for terminal/web integration
- `src/cli.ts` — demo runner
- `examples/` — hands-on examples
- `docs/` — detailed guides and references