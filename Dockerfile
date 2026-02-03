# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Build frontend and server
RUN npm run build
RUN npm run build:server

# Production
FROM node:20-alpine
WORKDIR /app

# Copy built frontend
COPY --from=build /app/dist ./dist

# Copy compiled server files (JS, not TS)
COPY --from=build /app/dist-server ./dist-server

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev

# Create data directory for SQLite
RUN mkdir -p /app/data

# Environment variables
ENV NODE_ENV=production
ENV PORT=3080
ENV DATA_DIR=/app/data

EXPOSE 3080

CMD ["node", "dist-server/server/index.js"]
