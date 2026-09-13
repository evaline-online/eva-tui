# TUI / Web UI References & Examples

## TUI Libraries

### Ink — React for terminal
- GitHub: https://github.com/vadimdemedes/ink
- Docs: https://github.com/vadimdemedes/ink/blob/master/readme.md
- Example: React components `<Box>`, `<Text>`, `useInput()` hook

### Blessed — Node.js terminal interface library
- GitHub: https://github.com/chjj/blessed
- README example: screen, box, key events, mouse support
- `blessed.screen({ smartCSR: true })`, `blessed.box({ top: "center", ... })`
- Widgets: form, list, table, prompt, log, overlay, image, bigtext

### Blessed-contrib — dashboards & ASCII art
- GitHub: https://github.com/yaronn/blessed-contrib

### Chalk — terminal colors
- GitHub: https://github.com/chalk/chalk
- Usage: `chalk.blue('Hello')`, chain `chalk.red.bold.bgHex(...)`
- `chalkStderr` for stderr coloring

### Picocolors — zero-dependency color library
- GitHub: https://github.com/alexeyraspopov/picocolors

### Figlet — ASCII art headers
- JS: https://github.com/patorjk/figlet.js
- Python: https://github.com/pwaller/pyfiglet
- Web/browser: `figlet.textSync("Hello", "Standard")`, preload fonts

## Terminal Interfaces & Text UIs

- Blessed screen and widgets model: `screen`, `box`, `list`, `table`
- ANSI escape codes: clear screen `\x1b[2J`, move cursor `\x1b[0;0H`
- Smart CSR for efficient redraw

## Cross-Platform Terminal Layout

- Flexbox-like layout via `<Box>` in Ink
- Blessed layout manager with `inline` / `grid`
- Manual coordinate positioning with `x, y` for fixed widgets

## Example Patterns

1. Simple banner: `figlet.textSync("eva-tui")` + chalk accent color
2. Dashboard: `blessed` screen + `listbar`, `table`, `log`
3. Input form: `blessed.form` with `input`, `button`, `checkbox`
4. Progress & spinners: custom `Progress`, `Spinner` widget
5. Web fallback: Canvas + text shapes matching terminal layout

## EvaLine Projects Using TUI Concepts

- `eva-face-3d/ascii_head.py` — ANSI 24-bit rendering in terminal
- `evaline-chat/src/cli.ts` — command-line chat interface with readline
- `eva-git/README.md` — ecosystem architecture including CLI idea
- `eva-git/AUDIT_AND_IMPROVEMENT_PLAN.md` — possible UI/UX improvements

## TODOs

- Add Ink example (`examples/basic-ink.tsx`)
- Add blessed-contrib dashboard example (`examples/blessed-dashboard.ts`)
- Add canvas web demo (`examples/web-canvas.tsx`)
- Add React component tests
- Add live resize handling
- Add high contrast / accessible themes
