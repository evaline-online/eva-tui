# KANBARD — eva-tui Project Board

## Columns

| Column | Meaning |
|--------|---------|
| `todo` | New tasks, not started |
| `in_progress` | Actively being worked on |
| `review` | Pending review / waiting for confirmation |
| `done` | Completed and merged |

## Epics & Stories

### Epic 1: Core Framework (TUI + Web)
- [x] 1.1.1 Define Renderer interface (terminal/ANSI + web/Canvas)
- [x] 1.1.2 Define Theme system (light/dark/custom)
- [x] 1.1.3 Define Layout system (Box, grid, flexbox)
- [x] 1.1.4 Implement TerminalRenderer (process.stdout + ANSI)
- [x] 1.1.5 Implement WebRenderer stub (process.stdout + ASCII bridge)

### Epic 2: Widget Library
- [x] 1.2.1 Box widget with title, border, padding
- [x] 1.2.2 Text widget with colors/bold/italic
- [x] 1.2.3 Button widget with click handler
- [x] 1.2.4 List widget with selection
- [x] 1.2.5 Table widget with headers/rows
- [x] 1.2.6 Progress bar widget
- [x] 1.2.7 Spinner widget for async operations

### Epic 3: Documentation & Examples
- [x] 1.3.1 Getting Started guide
- [x] 1.3.2 Widget reference
- [x] 1.3.3 Theme guide
- [x] 1.3.4 Backends API
- [ ] 1.3.5 Cross-platform considerations
- [x] 1.3.6 Examples directory (basic, dashboard, menu, welcome)

### Epic 4: Testing & Quality
- [x] 1.4.1 Unit tests for core modules
- [x] 1.4.2 TypeScript type checking (passing)
- [x] 1.4.3 ESLint configuration (passing)
- [x] 1.4.4 Security audit (0 vulnerabilities)
- [ ] 1.4.5 Test coverage threshold

## Sprint Board (Current: Sprint 0 — Foundations)

| ID | Task | Owner | Status |
|----|------|-------|--------|
| T001 | Setup repo, package.json, tsconfig | @dev | done |
| T002 | Define core types (Color, Spacing, FontSize, Theme) | @dev | done |
| T003 | Implement TerminalRenderer | @dev | done |
| T004 | Implement base widgets (Box, Text) | @dev | done |
| T005 | Add derived widgets (Button, List, Table, Progress, Spinner) | @dev | done |
| T006 | Write getting-started.md | @dev | done |
| T007 | Write widget reference docs | @dev | done |
| T008 | Write themes.md | @dev | done |
| T009 | Write backends.md | @dev | done |
| T010 | Write references.md | @dev | done |
| T011 | Add basic example | @dev | done |
| T012 | Add dashboard example | @dev | done |
| T013 | Add menu example | @dev | done |
| T014 | Add welcome example | @dev | done |
| T015 | Add tests folder and basic tests | @dev | done |
| T016 | Lint + typecheck setup | @dev | done |

## Retrospectives

- Sprint 0 wrap-up: ensure all widgets render, tests pass, docs complete
- Next sprint: React hook integration, web Canvas backend, CI config