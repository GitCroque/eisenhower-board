# Eisenhower Board

Une application web pour organiser vos tâches avec la matrice d'Eisenhower - une méthode de productivité qui classe les tâches selon leur urgence et leur importance.

## La Matrice d'Eisenhower

| Quadrant | Critères | Action |
|----------|----------|--------|
| **Urgent & Important** | Crises, deadlines, problèmes | Faire immédiatement |
| **Important mais Non-urgent** | Planification, développement personnel | Planifier |
| **Urgent mais Non-important** | Interruptions, certains emails | Déléguer |
| **Ni urgent ni important** | Distractions, perte de temps | Éliminer |

## Fonctionnalités

- Drag & drop des tâches entre les quadrants
- Édition des tâches (double-clic ou icône crayon)
- Persistance des données avec SQLite (Docker) ou localStorage (dev)
- Mode sombre / clair
- Design responsive

## Installation

```bash
# Cloner le repo
git clone https://github.com/jugue/eisenhower-board.git
cd eisenhower-board

# Installer les dépendances
npm install

# Lancer le serveur de développement (frontend uniquement)
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## Docker (Recommandé pour production)

L'application utilise Docker avec SQLite pour une persistance durable des données.

```bash
# Démarrer avec Docker Compose
docker compose up

# Ou en arrière-plan
docker compose up -d
```

L'application sera accessible sur [http://localhost:3080](http://localhost:3080)

Les données sont stockées dans un volume Docker (`eisenhower-data`) et persistent entre les redémarrages.

## Scripts

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance le serveur Vite de développement |
| `npm run build` | Crée le build frontend de production |
| `npm run build:server` | Compile le serveur TypeScript |
| `npm run build:all` | Build complet (frontend + backend) |
| `npm run start` | Démarre le serveur Express de production |
| `npm run preview` | Prévisualise le build frontend |

## Architecture

```
eisenhower-board/
├── server/                # Backend Express + SQLite
│   ├── index.ts          # Serveur Express, routes API
│   └── db.ts             # SQLite avec better-sqlite3
├── src/                   # Frontend React
│   ├── components/       # Composants React
│   ├── hooks/            # Hooks personnalisés
│   └── types/            # Types TypeScript
├── Dockerfile            # Build multi-stage
└── docker-compose.yml    # Avec volume pour persistance
```

## API REST

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/tasks | Récupère toutes les tâches |
| POST | /api/tasks | Crée une tâche |
| PATCH | /api/tasks/:id | Met à jour une tâche |
| DELETE | /api/tasks/:id | Supprime une tâche |

## Stack technique

- [React 18](https://react.dev/) + TypeScript
- [Vite](https://vite.dev/) - Build tool
- [Tailwind CSS v4](https://tailwindcss.com/) - Styling
- [@dnd-kit](https://dndkit.com/) - Drag and drop
- [next-themes](https://github.com/pacocoursey/next-themes) - Dark mode
- [Express](https://expressjs.com/) - Backend server
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) - SQLite
- [Lucide](https://lucide.dev/) - Icônes

## Licence

MIT
