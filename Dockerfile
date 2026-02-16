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

# Copy package files first for better layer caching
COPY package*.json ./

# Copy built frontend
COPY --from=build /app/dist ./dist

# Copy compiled server files (JS, not TS)
COPY --from=build /app/dist-server ./dist-server

# Install production dependencies with build tools in a single layer, then remove
RUN apk add --no-cache --virtual .build-deps python3 make g++ \
    && npm ci --omit=dev \
    && apk del .build-deps

# Create data directory for SQLite
RUN mkdir -p /app/data

# Environment variables
ENV NODE_ENV=production
ENV PORT=3080
ENV DATA_DIR=/app/data

EXPOSE 3080

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3080/api/tasks || exit 1

CMD ["node", "dist-server/server/index.js"]
