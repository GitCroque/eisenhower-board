# Build stage
FROM node:20-alpine AS build
WORKDIR /app

# Version from release tag (passed via --build-arg)
ARG APP_VERSION=dev

# Install build dependencies for native modules (better-sqlite3)
RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm ci
COPY . .

# Build frontend and server (pass version to Vite)
ENV APP_VERSION=${APP_VERSION}
RUN npm run build
RUN npm run build:server

# Production
FROM node:20-alpine
WORKDIR /app

# Install build dependencies for native modules (better-sqlite3)
RUN apk add --no-cache python3 make g++

# Copy built frontend
COPY --from=build /app/dist ./dist

# Copy compiled server files (JS, not TS)
COPY --from=build /app/dist-server ./dist-server

# Copy package files
COPY package*.json ./

# Install production dependencies only (rebuilds native modules for target arch)
RUN npm ci --omit=dev

# Remove build dependencies to reduce image size
RUN apk del python3 make g++

# Create data directory for SQLite
RUN mkdir -p /app/data

# Environment variables
ENV NODE_ENV=production
ENV PORT=3080
ENV DATA_DIR=/app/data

EXPOSE 3080

CMD ["node", "dist-server/server/index.js"]
