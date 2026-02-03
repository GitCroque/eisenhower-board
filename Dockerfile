# Build frontend
FROM node:20-alpine AS build-frontend
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production
FROM node:20-alpine
WORKDIR /app

# Copy built frontend
COPY --from=build-frontend /app/dist ./dist

# Copy server files
COPY server ./server
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

CMD ["node", "server/index.js"]
