# Focus by Eisenhower

A free, open-source web application to organize your tasks using the [Eisenhower Matrix](https://en.wikipedia.org/wiki/Time_management#The_Eisenhower_Method) — a productivity method that helps you prioritize by sorting tasks into four quadrants based on urgency and importance.

**Use it now at [focus.letmiko.app](https://focus.letmiko.app)** — no install required, just sign in with your email.

|  |  |
|:---:|:---:|
| ![Light mode](docs/screenshot-light.png) | ![Dark mode](docs/screenshot-dark.png) |
| Light mode | Dark mode |

## Features

- **Drag & drop** tasks between quadrants
- **Passwordless sign-in** — localized magic-link sent to your email
- **Multi-user** — each account has its own private board
- **14 languages** — auto-detected from your browser
- **Dark / light mode** — follows your system preference
- **Responsive** — works on desktop, tablet and mobile
- **Archive** — complete tasks and review them later
- **Open source** — free forever, no tracking, no ads

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
| Email | [Resend](https://resend.com/) (HTTPS API) or SMTP via [Nodemailer](https://nodemailer.com/) |
| Backend | [Express](https://expressjs.com/) |
| Database | [SQLite](https://www.sqlite.org/) via [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) |
| Validation | [Zod](https://zod.dev/) |
| Tests | [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) |

## Self-hosting

The application is available as a Docker image for `linux/amd64` and `linux/arm64` on the [GitHub Container Registry](https://github.com/GitCroque/eisenhower-board/pkgs/container/eisenhower-board).

### Railway (recommended)

The app is deployed on [Railway](https://railway.com/) with auto-deploy from GitHub. A `railway.toml` is included in the repo.

Required Railway variables:

| Variable | Description |
|----------|-------------|
| `APP_BASE_URL` | Public URL (e.g. `https://focus.letmiko.app`) |
| `TRUST_PROXY` | Hop count for reverse proxy (`1` for Railway) |
| `RESEND_API_KEY` | [Resend](https://resend.com/) API key for sending emails |
| `MAIL_FROM` | Sender email address (must be verified in Resend) |

### Docker

Create a `.env` file with your configuration, then run:

```bash
docker compose --profile prod up -d
```

Required environment variables:

| Variable | Description |
|----------|-------------|
| `APP_BASE_URL` | Public URL (e.g. `https://your-domain.com`) |
| `TRUST_PROXY` | Proxy trust setting (`false` by default, use `1` or a subnet behind a reverse proxy) |
| `MAIL_FROM` | Sender email address |

Email provider (one of):

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | Resend API key (recommended, uses HTTPS) |
| `SMTP_HOST` | SMTP server hostname (fallback) |
| `SMTP_PORT` | SMTP port (default: `465`) |
| `SMTP_SECURE` | Use TLS (default: `true`) |
| `SMTP_USER` | SMTP username |
| `SMTP_PASS` | SMTP password |

Optional environment variables:

| Variable | Description |
|----------|-------------|
| `SQLITE_JOURNAL_MODE` | SQLite journal mode (`WAL` by default). Set `DELETE` on volumes that do not support WAL shared-memory files, such as some NAS, NFS, CIFS, or FUSE-backed mounts. |

Data is stored in a SQLite database inside the `eisenhower-data` volume and persists between restarts.

## Development

```bash
git clone https://github.com/GitCroque/eisenhower-board.git
cd eisenhower-board
npm install

# Terminal 1 — backend
npm run build:server && npm run start

# Terminal 2 — frontend
npm run dev
```

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend dev server (port 3000) |
| `npm run build:all` | Full production build (frontend + backend) |
| `npm run start` | Start Express server (port 3080) |
| `npm test` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |

## Architecture

```
eisenhower-board/
├── docker/               # Docker support files
│   └── entrypoint.sh     # Container entrypoint
├── server/               # Express + SQLite backend
│   ├── index.ts          # API routes, auth, CSRF
│   ├── db.ts             # SQLite database layer
│   ├── mailer.ts         # Magic-link emails (Resend API or SMTP)
│   └── tsconfig.json     # Server TypeScript config
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
├── docker-compose.yml    # Docker Compose (dev + prod profile)
└── railway.toml          # Railway deployment config
```

## License

MIT
