# Eisenhower Board

An open-source web application to create and manage an [Eisenhower Matrix](https://en.wikipedia.org/wiki/Time_management#The_Eisenhower_Method), also known as a Priority Matrix or Urgent-Important Matrix.

Powered by React, Express and SQLite. Deployed at [tasks.letmiko.app](https://tasks.letmiko.app).

|  |  |
|:---:|:---:|
| ![Light mode](docs/screenshot-light.png) | ![Dark mode](docs/screenshot-dark.png) |
| Light mode | Dark mode |

## Features

- **Drag & drop** tasks between quadrants
- **Magic-link authentication** — passwordless email sign-in
- **Multi-user** — tasks are isolated per account
- **14 languages** — auto-detected from browser, switchable at any time
- **Dark / light mode** — system-aware with manual toggle
- **Responsive** — works on desktop, tablet and mobile
- **Glass-morphism UI** — modern translucent design
- **Archive** — complete tasks and review them later
- **SQLite persistence** — lightweight, zero-config database

## Prerequisites

- [Node.js](https://nodejs.org/) 20+
- npm

## Environment Variables

Magic-link authentication requires SMTP credentials:

| Variable | Description | Example |
|----------|-------------|---------|
| `APP_BASE_URL` | Public URL of the app | `https://tasks.letmiko.app` |
| `SMTP_HOST` | SMTP server | `smtp.fastmail.com` |
| `SMTP_PORT` | SMTP port | `465` |
| `SMTP_SECURE` | Use TLS | `true` |
| `SMTP_USER` | SMTP username | `user@domain.com` |
| `SMTP_PASS` | SMTP password / app password | `••••••` |
| `MAIL_FROM` | Sender email | `noreply@domain.com` |

## How to Run

### Local development

```bash
git clone https://github.com/GitCroque/eisenhower-board.git
cd eisenhower-board
npm install

# Terminal 1 — backend
npm run build:server && npm run start

# Terminal 2 — frontend
npm run dev
```

Frontend: http://localhost:3000 — API: http://localhost:3080

### Docker (recommended)

```bash
docker compose up -d
```

The app is available at http://localhost:3080. Data is stored in a Docker volume (`eisenhower-data`) and persists between restarts.

### Production with pre-built image

```yaml
services:
  eisenhower-board:
    image: ghcr.io/gitcroque/eisenhower-board:latest
    ports:
      - "3080:3080"
    volumes:
      - eisenhower-data:/app/data
    environment:
      - NODE_ENV=production
      - APP_BASE_URL=https://your-domain.com
      - SMTP_HOST=smtp.fastmail.com
      - SMTP_PORT=465
      - SMTP_SECURE=true
      - SMTP_USER=${SMTP_USER}
      - SMTP_PASS=${SMTP_PASS}
      - MAIL_FROM=${MAIL_FROM}
    restart: unless-stopped

volumes:
  eisenhower-data:
```

Image published on [GitHub Container Registry](https://github.com/GitCroque/eisenhower-board/pkgs/container/eisenhower-board) for `linux/amd64` and `linux/arm64`.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | [React 18](https://react.dev/) + TypeScript |
| Build | [Vite](https://vite.dev/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Components | [shadcn/ui](https://ui.shadcn.com/) |
| Drag & drop | [@dnd-kit](https://dndkit.com/) |
| Dark mode | [next-themes](https://github.com/pacocoursey/next-themes) |
| Icons | [Lucide](https://lucide.dev/) |
| Backend | [Express](https://expressjs.com/) |
| Database | [SQLite](https://www.sqlite.org/) via [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) |
| Validation | [Zod](https://zod.dev/) |
| Tests | [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite frontend dev server |
| `npm run build` | Production frontend build |
| `npm run build:server` | Compile server TypeScript |
| `npm run build:all` | Full build (frontend + backend) |
| `npm run start` | Start Express production server |
| `npm test` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |

## Architecture

```
eisenhower-board/
├── server/               # Express + SQLite backend
│   ├── index.ts          # API routes, auth, CSRF
│   ├── db.ts             # SQLite database layer
│   └── mailer.ts         # SMTP magic-link emails
├── shared/               # Shared code (frontend + backend)
│   ├── types.ts          # Task, QuadrantKey, QuadrantsState
│   ├── validation.ts     # Zod schemas
│   └── sanitize.ts       # Input sanitization
├── src/                  # React frontend
│   ├── auth/             # Auth context & session management
│   ├── components/       # UI components
│   ├── hooks/            # useApi, useCsrfFetch, useLocalStorage
│   ├── i18n/             # 14 languages
│   └── types/            # TypeScript types
├── Dockerfile            # Multi-stage Alpine build
├── docker-compose.yml    # Local development
└── docker-compose.prod.yml  # Production deployment
```

## REST API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/magic-link` | Request sign-in email |
| `GET` | `/api/auth/verify?token=…` | Verify token, create session |
| `GET` | `/api/auth/me` | Get current user |
| `POST` | `/api/auth/logout` | End session |
| `GET` | `/api/tasks` | List tasks by quadrant |
| `POST` | `/api/tasks` | Create a task |
| `PATCH` | `/api/tasks/:id` | Update text or quadrant |
| `DELETE` | `/api/tasks/:id` | Delete a task |
| `POST` | `/api/tasks/:id/complete` | Archive a task |
| `GET` | `/api/archived-tasks` | List archived tasks |
| `DELETE` | `/api/archived-tasks/:id` | Permanently delete archived task |

All mutating endpoints require a CSRF token (`X-CSRF-Token` header). Task and archive endpoints require authentication.

## License

MIT
