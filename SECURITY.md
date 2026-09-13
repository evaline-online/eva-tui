# Security Audit Report — eva-tui

## Summary
- Audit date: 2026-09-13
- Audit scope: `src/`, `tests/`, `examples/`, `package.json`, `tsconfig.json`
- Tools: `npm audit`, manual code review
- Result: **0 vulnerabilities**

## Findings

### 1. Dependencies
- All dependencies are clean (no known CVEs).
- `chalk`, `figlet`, `ink`, `react`, `yaml`, `tsx`, `typescript`, `eslint`, `@typescript-eslint/*` — all up-to-date.

### 2. Input Handling
- `parseLayout` and `parseWeb` in `src/core/formats.ts` accept user-provided YAML/JSON. No code execution risk (YAML parser is safe by default).
- `escapeHtml` in `WebRenderer` escapes `<`, `>`, `&`, `"` before rendering.
- CLI arguments are validated in `src/cli.ts` with `process.argv` parsing.

### 3. DOM / Web Output
- `WebRenderer.toHtml()` uses `escapeHtml()` on all text content.
- No `innerHTML` assignments in runtime code.

### 4. File System Access
- `src/cli.ts` reads files via `fs.readFileSync` only when explicitly invoked (`parse` command).
- No arbitrary path access; file path comes from CLI argument.

### 5. Environment Variables
- No environment variable usage in source code.

## Recommendations
- Add `npm audit` to CI pipeline (already present in `.github/workflows/ci.yml`).
- Consider adding `--frozen-lockfile` to CI install step for reproducible builds.
- Add `security-audit` script to `package.json`.
