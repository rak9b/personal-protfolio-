# 🐳 Docker & DevOps Documentation

## Overview
This document provides complete Docker configuration and CI/CD pipeline setup for the Digital Twin Portfolio project.

---

## Docker Setup

### Prerequisites
- Docker Desktop ([Download](https://www.docker.com/products/docker-desktop))
- Docker Compose (included with Docker Desktop)

---

## Frontend Dockerfile

```dockerfile
# frontend/Dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Build Next.js application
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3002

ENV PORT 3002

CMD ["node", "server.js"]
```

### Build & Run Frontend
```bash
# Build
docker build -t portfolio-frontend ./frontend

# Run
docker run -p 3002:3002 --env-file frontend/.env.local portfolio-frontend
```

---

## Backend Dockerfile

```dockerfile
# backend/Dockerfile
FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY prisma ./prisma/
RUN npm ci

# Build application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build TypeScript
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

# Copy built application
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nodejs:nodejs /app/package.json ./

USER nodejs

EXPOSE 5001

CMD ["npm", "start"]
```

### Build & Run Backend
```bash
# Build
docker build -t portfolio-backend ./backend

# Run
docker run -p 5001:5001 --env-file backend/.env portfolio-backend
```

---

## Docker Compose

### docker-compose.yml
```yaml
version: '3.8'

services:
  # Backend Service
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "5001:5001"
    environment:
      - NODE_ENV=production
      - PORT=5001
      - MONGODB_URI=${MONGODB_URI}
      - JWT_SECRET=${JWT_SECRET}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - GEMINI_API_KEY=${GEMINI_API_KEY}
    volumes:
      - ./backend/logs:/app/logs
    depends_on:
      - mongodb
    restart: unless-stopped

  # Frontend Service
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3002:3002"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=http://backend:5001/api
    depends_on:
      - backend
    restart: unless-stopped

  # MongoDB (Optional - for local development)
  mongodb:
    image: mongo:7
    ports:
      - "27017:27017"
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=password
    volumes:
      - mongodb_data:/data/db
    restart: unless-stopped

volumes:
  mongodb_data:
```

### Development docker-compose
```yaml
# docker-compose.dev.yml
version: '3.8'

services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.dev
    ports:
      - "5001:5001"
    environment:
      - NODE_ENV=development
    volumes:
      - ./backend:/app
      - /app/node_modules
    command: npm run dev

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.dev
    ports:
      - "3002:3002"
    environment:
      - NODE_ENV=development
    volumes:
      - ./frontend:/app
      - /app/node_modules
      - /app/.next
    command: npm run dev
```

### Running with Docker Compose
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild and start
docker-compose up --build -d
```

---

## CI/CD Pipeline

### GitHub Actions Workflow

#### .github/workflows/ci.yml
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '20'

jobs:
  # Lint & Test Backend
  backend-test:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./backend

    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
          cache-dependency-path: backend/package-lock.json

      - name: Install dependencies
        run: npm ci

      - name: Generate Prisma Client
        run: npx prisma generate

      - name: Run linter
        run: npm run lint

      - name: Run tests
        run: npm run test:coverage

      - name: Build
        run: npm run build

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          files: ./backend/coverage/lcov.info
          flags: backend

  # Lint & Test Frontend
  frontend-test:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./frontend

    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run tests
        run: npm run test:coverage

      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_API_URL: http://localhost:5001/api

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          files: ./frontend/coverage/lcov.info
          flags: frontend

  # Deploy Backend to Render
  deploy-backend:
    needs: backend-test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest

    steps:
      - name: Deploy to Render
        env:
          RENDER_DEPLOY_HOOK: ${{ secrets.RENDER_DEPLOY_HOOK_BACKEND }}
        run: |
          curl -X POST $RENDER_DEPLOY_HOOK

  # Deploy Frontend to Vercel
  deploy-frontend:
    needs: frontend-test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./frontend
          vercel-args: '--prod'
```

---

## Environment Management

### .env.example Files

#### Frontend
```bash
# frontend/.env.example
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

#### Backend
```bash
# backend/.env.example
PORT=5001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=...
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FRONTEND_URL=http://localhost:3002
```

---

## Multi-Stage Builds

### Benefits
- **Smaller Images**: Production images don't include dev dependencies
- **Build Caching**: Faster rebuilds with layer caching
- **Security**: Reduced attack surface

### Example Optimization
```dockerfile
# Before: 1.2GB
FROM node:20
COPY . .
RUN npm install
CMD ["npm", "start"]

# After: 200MB
FROM node:20-alpine AS deps
COPY package*.json ./
RUN npm ci --only=production

FROM node:20-alpine
COPY --from=deps /app/node_modules ./node_modules
COPY dist ./dist
CMD ["node", "dist/index.js"]
```

---

## Health Checks in Docker

```yaml
# docker-compose.yml
services:
  backend:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5001/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

---

## Volume Management

### Development Volumes
```yaml
volumes:
  # Persist node_modules
  - ./backend:/app
  - /app/node_modules
  
  # Persist database data
  - mongodb_data:/data/db
  
  # Persist logs
  - ./logs:/app/logs
```

---

## Docker Security Best Practices

1. **Use Official Base Images**: `node:20-alpine`
2. **Run as Non-Root User**: Create and use `nodejs` user
3. **Multi-Stage Builds**: Minimize final image size
4. **Scan Images**: Use `docker scan` for vulnerabilities
5. **Pin Versions**: Avoid `latest` tags
6. **Minimize Layers**: Combine RUN commands
7. **Use .dockerignore**: Exclude unnecessary files

### .dockerignore
```
node_modules
npm-debug.log
.env
.git
.gitignore
README.md
.vscode
coverage
dist
logs
*.log
```

---

## Kubernetes Deployment (Optional)

### backend-deployment.yaml
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: portfolio-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: portfolio-backend
  template:
    metadata:
      labels:
        app: portfolio-backend
    spec:
      containers:
      - name: backend
        image: portfolio-backend:latest
        ports:
        - containerPort: 5001
        env:
        - name: NODE_ENV
          value: "production"
        - name: MONGODB_URI
          valueFrom:
            secretKeyRef:
              name: portfolio-secrets
              key: mongodb-uri
        livenessProbe:
          httpGet:
            path: /api/live
            port: 5001
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /api/ready
            port: 5001
          initialDelaySeconds: 5
          periodSeconds: 5
```

---

## Troubleshooting

### Common Issues

#### Container Won't Start
```bash
# Check logs
docker-compose logs backend

# Inspect container
docker inspect portfolio-backend

# Exec into container
docker exec -it portfolio-backend sh
```

#### Database Connection Issues
```bash
# Check network
docker network ls
docker network inspect portfolio_default

# Test MongoDB connection
docker exec -it portfolio

-backend sh
node -e "require('mongodb').MongoClient.connect('$MONGODB_URI')"
```

#### Build Failures
```bash
# Clean build cache
docker builder prune

# Remove all containers and images
docker-compose down --rmi all
docker system prune -a
```

---

**Last Updated**: 2025-12-29  
**Next Review**: 2025-03-29
