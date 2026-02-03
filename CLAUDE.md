# Eisenhower Board

Web application for the Eisenhower Matrix to organize tasks by priority and urgency.

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS v4
- shadcn/ui
- @dnd-kit (drag & drop)
- next-themes (dark mode)
- Express + SQLite (backend)
- Zod (validation)
- Vitest + Testing Library (tests)

## Commands

```bash
# Frontend development
npm run dev          # Start Vite dev server (port 3000)
npm run build        # Production frontend build

# Backend
npm run build:server # Compile server TypeScript to dist-server/
npm run start        # Start Express server (port 3080)

# Full production build (frontend + backend)
npm run build:all

# Testing
npm test             # Run tests in watch mode
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage

# Docker (recommended for production)
docker compose up    # Start app with SQLite persistence
```

## Architecture

```
eisenhower-board/
├── .github/workflows/
│   ├── docker-publish.yml  # CI: build image on push to main
│   └── release.yml         # CD: release on tag v*
├── shared/                 # Shared code (frontend + backend)
│   ├── types.ts           # Task, QuadrantKey, QuadrantsState
│   ├── validation.ts      # Zod schemas
│   └── sanitize.ts        # Input sanitization
├── server/                 # Express + SQLite backend (source)
│   ├── index.ts           # Express server, API routes, CSRF
│   └── db.ts              # SQLite with better-sqlite3
├── dist-server/            # Compiled server (gitignored)
│   ├── server/            # Compiled server/*.ts
│   └── shared/            # Compiled shared/*.ts
├── src/
│   ├── components/
│   │   ├── ui/            # shadcn/ui + custom (alert-dialog, toast)
│   │   ├── EisenhowerMatrix.tsx  # Main matrix layout
│   │   ├── QuadrantCard.tsx      # Quadrant container
│   │   ├── TaskItem.tsx          # Draggable task with delete confirm
│   │   ├── ErrorBoundary.tsx     # React error boundary
│   │   ├── ThemeToggle.tsx       # Dark mode toggle
│   │   └── LanguageSelector.tsx  # Language dropdown
│   ├── hooks/
│   │   ├── useApi.ts      # Hook for REST API calls + CSRF
│   │   └── useLocalStorage.ts
│   ├── i18n/
│   │   ├── index.ts       # Re-exports
│   │   ├── translations.ts # All language strings (14 languages)
│   │   └── LanguageContext.tsx # React context provider
│   ├── test/
│   │   ├── setup.ts       # Vitest setup + mocks
│   │   └── mocks/handlers.ts # MSW API handlers
│   ├── types/
│   │   └── index.ts       # Re-exports from shared + frontend types
│   └── lib/
│       └── utils.ts
├── Dockerfile             # Multi-stage: build frontend + Node.js
├── docker-compose.yml     # Dev: local build
├── docker-compose.prod.yml # Prod: uses ghcr.io image
├── tsconfig.json          # Frontend TypeScript config
├── tsconfig.server.json   # Server TypeScript config
└── vitest.config.ts       # Test configuration
```

## REST API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/csrf-token | Get CSRF token for mutations |
| GET | /api/tasks | Get all tasks grouped by quadrant |
| POST | /api/tasks | Create a task `{ text, quadrant }` |
| PATCH | /api/tasks/:id | Update `{ text }` or `{ quadrant }` |
| DELETE | /api/tasks/:id | Delete a task |

**Note**: POST, PATCH, DELETE require `X-CSRF-Token` header.

## Security

- **CSRF Protection**: All mutating endpoints require a valid CSRF token
- **Input Sanitization**: Task text is sanitized server-side (HTML stripped, length limited)
- **Request Size Limit**: 10KB body size limit on API requests
- **Error Boundary**: React errors are caught and displayed gracefully

## Internationalization (i18n)

Supported languages:
- English (en)
- French (fr)
- German (de)
- Spanish (es)
- Italian (it)
- Portuguese (pt)
- Dutch (nl)
- Polish (pl)
- Russian (ru)
- Ukrainian (uk)
- Chinese (zh)
- Hindi (hi)
- Arabic (ar)
- Bengali (bn)

Language is auto-detected from browser settings. Users can change it via the dropdown in the header.

Translations are in `src/i18n/translations.ts`. To add a new language:
1. Add the language code to the `Language` type
2. Add translations object following the `Translations` interface

## UI Design

### Layout
- Unified 2x2 grid for quadrants
- Vertical axis labels (IMPORTANT / NOT IMPORTANT) at 25% and 75%
- Horizontal axis labels (URGENT / NOT URGENT) above the grid
- Glass-morphism effects (backdrop-blur, semi-transparent backgrounds)

### Task Interactions
- Entire task card is draggable
- Hover to reveal action buttons (complete ✓, delete ×)
- Delete shows confirmation dialog
- Complete button triggers fade-out animation before deletion

## Testing

Tests use Vitest with jsdom environment and MSW for API mocking.

```bash
npm test                    # Watch mode
npm run test:coverage       # With coverage report
```

Test files:
- `src/hooks/useLocalStorage.test.ts` - LocalStorage hook tests
- `src/components/TaskItem.test.tsx` - Task component tests

## Conventions

- Functional components with hooks
- Explicit TypeScript types (no `any`)
- Tailwind for styling (no CSS modules)
- PascalCase filenames for components
- UI text uses translations, code in English
- Shared types in `shared/` directory

## Quadrants

| Quadrant | Color | Action |
|----------|-------|--------|
| Urgent & Important | Red | Do immediately |
| Important not urgent | Blue | Schedule |
| Urgent not important | Yellow | Delegate |
| Neither urgent nor important | Gray | Eliminate |

## Persistence

In production (Docker), data is stored in SQLite:
- Database: `/app/data/tasks.db`
- Docker volume: `eisenhower-data`
- Data persists between container restarts

## CI/CD

GitHub Actions workflows in `.github/workflows/`:

| Workflow | Trigger | Action |
|----------|---------|--------|
| `docker-publish.yml` | Push to `main` | Build and push Docker image |
| `release.yml` | Tag `v*` | Create GitHub release + Docker image |

## Docker Registry

Image published on GitHub Container Registry:
```
ghcr.io/gitcroque/eisenhower-board:latest
ghcr.io/gitcroque/eisenhower-board:v1.5.0
```

Supported architectures: `linux/amd64`, `linux/arm64`

### Portainer Deployment

```yaml
services:
  eisenhower-board:
    image: ghcr.io/gitcroque/eisenhower-board:latest
    container_name: eisenhower-board
    ports:
      - "3080:3080"
    volumes:
      - eisenhower-data:/app/data
    restart: unless-stopped

volumes:
  eisenhower-data:
```
