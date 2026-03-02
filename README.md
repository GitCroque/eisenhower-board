# Eisenhower Board

A web application to organize your tasks using the Eisenhower Matrix - a productivity method that categorizes tasks by urgency and importance.

## The Eisenhower Matrix

| Quadrant | Criteria | Action |
|----------|----------|--------|
| **Urgent & Important** | Crises, deadlines, problems | Do immediately |
| **Important but Not Urgent** | Planning, personal development | Schedule |
| **Urgent but Not Important** | Interruptions, some emails | Delegate |
| **Neither Urgent nor Important** | Distractions, time wasters | Eliminate |

## Features

- Drag & drop tasks between quadrants
- Edit tasks (pencil icon)
- Magic-link authentication (email)
- Multi-user task isolation
- Data persistence with SQLite backend
- Dark / light mode
- Multi-language support (14 languages)
- Responsive design
- Beautiful glass-morphism UI

## Installation

```bash
# Clone the repo
git clone https://github.com/GitCroque/eisenhower-board.git
cd eisenhower-board

# Install dependencies
npm install

# Start backend API (terminal 1)
npm run dev:server

# Start frontend (terminal 2)
npm run dev
```

Frontend: [http://localhost:3000](http://localhost:3000)  
Backend API: [http://localhost:3080](http://localhost:3080)

## Authentication Environment Variables

Magic-link delivery requires SMTP configuration (Fastmail-compatible):

```bash
SMTP_HOST=smtp.fastmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-fastmail-user
SMTP_PASS=your-fastmail-app-password
MAIL_FROM=you@your-domain.com
APP_BASE_URL=http://localhost:3080
```

## Docker (Recommended for production)

The application uses Docker with SQLite for durable data persistence.

```bash
# Start with Docker Compose
docker compose up

# Or in the background
docker compose up -d
```

The application will be available at [http://localhost:3080](http://localhost:3080)

Data is stored in a Docker volume (`eisenhower-data`) and persists between restarts.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite frontend dev server |
| `npm run dev:server` | Start Express backend dev server |
| `npm run build` | Create production frontend build |
| `npm run build:server` | Compile server TypeScript |
| `npm run build:all` | Full build (frontend + backend) |
| `npm run start` | Start Express production server |
| `npm run migrate:auth-reset` | Reset DB schema for auth-enabled multi-user mode |
| `npm run preview` | Preview frontend build |
| `npm run test` | Run tests |
| `npm run test:coverage` | Run tests with coverage |

## Architecture

```
eisenhower-board/
├── server/                # Express + SQLite backend
│   ├── index.ts          # Express server, API routes
│   └── db.ts             # SQLite with better-sqlite3
├── src/                   # React frontend
│   ├── components/       # React components
│   ├── hooks/            # Custom hooks
│   ├── i18n/             # Internationalization
│   └── types/            # TypeScript types
├── Dockerfile            # Multi-stage build
└── docker-compose.yml    # With volume for persistence
```

## REST API

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/magic-link | Request sign-in link |
| GET | /api/auth/verify?token=... | Verify link and create session |
| GET | /api/auth/me | Get auth state |
| POST | /api/auth/logout | Destroy current session |
| GET | /api/tasks | Get current user tasks |
| POST | /api/tasks | Create a task for current user |
| PATCH | /api/tasks/:id | Update a current user task |
| DELETE | /api/tasks/:id | Delete a current user task |

## Tech Stack

- [React 18](https://react.dev/) + TypeScript
- [Vite](https://vite.dev/) - Build tool
- [Tailwind CSS v4](https://tailwindcss.com/) - Styling
- [@dnd-kit](https://dndkit.com/) - Drag and drop
- [next-themes](https://github.com/pacocoursey/next-themes) - Dark mode
- [Express](https://expressjs.com/) - Backend server
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) - SQLite
- [Lucide](https://lucide.dev/) - Icons

## License

MIT
