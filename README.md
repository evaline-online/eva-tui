# eva-tui

**Универсальный фреймворк TUI / Web для всех прокси-проектов EvaLine & EvaBot.**
Создаём гиперсовременные терминальные и веб-интерфейсы по принципу **от меньшего к большему**: текст → markdown → ANSI → ASCII/Unicode → JSON/YAML → HTML/CSS/JS. Один код — терминал и браузер.

---

## Архитектура

```
eva-tui/
├── src/
│   ├── core/          # Ядро: Theme, Renderer, Layout, createLayoutApp
│   ├── widgets/       # Виджеты: Box, Text, Button, List, Table, Progress, Spinner
│   ├── backends/      # Бэкенды рендеринга (Terminal, Web)
│   ├── hooks/         # React-хуки: useInput, useTheme, useLayout
│   ├── cli.ts         # CLI demo
│   └── index.ts       # Public API
├── examples/          # Примеры использования
├── docs/              # Документация
│   ├── architecture.md
│   ├── development.md
│   ├── getting-started.md
│   ├── widgets.md
│   ├── themes.md
│   ├── backends.md
│   ├── references.md
│   └── index.md
├── tests/             # Тесты
├── KANBAN.md          # Kanban-доска проекта
├── CHANGELOG.md
├── CONTRIBUTING.md
├── README.md
├── package.json
└── tsconfig.json
```

## Принципы фреймворка

1. **От меньшего к большему** — примитивы (`Text`, `Box`) собираются в сложные интерфейсы (`Table`, `Dashboard`).
2. **Форматно-независимое рендерение** — ядро работает с абстрактным текстом; бэкенд превращает его в ANSI, ASCII, UTF-8, HTML, JSON и т.д.
3. **Один код — две среды** — терминал (ANSI/UTF-8) и браузер (Canvas/DOM) используют одни и те же виджеты.
4. **Graceful fallbacks** — если шрифт или функция недоступны, происходит плавное ухудшение: Unicode → ASCII → plain text; Truecolor → 256 → ANSI → plain.
5. **Composition over inheritance** — виджеты — это plain-объекты с методами-строителями.

## Паддинги и отступы

| Отступ | Пиксели | Назначение |
|--------|---------|------------|
| `Spacing.xs` | 4 | межэлементный |
| `Spacing.sm` | 8 | минимальный |
| `Spacing.md` | 16 | стандартный |
| `Spacing.lg` | 24 | секционный |
| `Spacing.xl` | 32 | межсекционный |

## Быстрый старт

```bash
npm install
npm run dev
```

## Документация

| Документ | Описание |
|----------|----------|
| `docs/architecture.md` | Архитектура, пайплайн, фолбеки |
| `docs/development.md` | Настройка, код-стайл, тесты |
| `docs/getting-started.md` | Быстрый старт |
| `docs/widgets.md` | Справочник виджетов |
| `docs/themes.md` | Темы и палитры |
| `docs/backends.md` | Backends API |
| `docs/references.md` | Ссылки и примеры |
| `KANBAN.md` | Доска задач |

## Ключевые особенности

- **Базовые виджеты**: Box, Text, Button, List, Table, Progress, Spinner
- **Темы**: светлая, тёмная, высокий контраст, кастомная
- **Backends**: TerminalRenderer (ANSI/UTF-8), WebRenderer (Canvas/SVG stub)
- **Layout engine**: Box-based flex/grid с absolute-позиционированием
- **Тесты**: node:test + node:assert
- **TypeScript strict**

## Лицензия

UNLICENSED — принадлежит EvaLine Collective.