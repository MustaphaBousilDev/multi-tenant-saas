# Multi-stage Dockerfile for NestJS monorepo with Prisma automation
ARG NODE_VERSION=18.18.2
ARG SERVICE_NAME
ARG SERVICE_PORT=3000

FROM node:${NODE_VERSION}-alpine AS dependencies
# Install system dependencies
RUN apk add --no-cache dumb-init openssl bash curl
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY nest-cli.json ./
COPY tsconfig*.json ./

# Install dependencies
RUN npm ci --frozen-lockfile && npm cache clean --force

# =============================================================================
# Build stage - Build with automated Prisma generation
# =============================================================================
FROM dependencies AS build
ARG SERVICE_NAME

# Copy scripts first
COPY scripts/ ./scripts/

# Make scripts executable
RUN chmod +x scripts/*.sh

# Copy source code
COPY . .

# Generate Prisma clients only if they exist
RUN find apps -name "schema.prisma" -type f -exec npx prisma generate --schema={} \; || echo "No Prisma schemas found"

# Build the specific service
RUN npm run build ${SERVICE_NAME}

# Clean up
RUN npm prune --production && npm cache clean --force

# =============================================================================
# Production stage - Final runtime image
# =============================================================================
FROM node:${NODE_VERSION}-alpine AS production

ARG SERVICE_NAME
ARG SERVICE_PORT

# Install runtime dependencies
RUN apk add --no-cache dumb-init curl openssl bash

WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

# Copy scripts for runtime operations
COPY --from=build --chown=nestjs:nodejs /app/scripts ./scripts
RUN chmod +x scripts/*.sh

# Copy production files
COPY --from=build --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=nestjs:nodejs /app/dist ./dist
COPY --from=build --chown=nestjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build --chown=nestjs:nodejs /app/apps/*/prisma ./prisma-schemas/
COPY --from=build --chown=nestjs:nodejs /app/package.json ./

# Create logs directory
RUN mkdir -p /app/logs && chown -R nestjs:nodejs /app/logs

# Environment variables
ENV NODE_ENV=production
ENV SERVICE_NAME=${SERVICE_NAME}
ENV PORT=${SERVICE_PORT}
ENV NODE_OPTIONS="--max-old-space-size=512"

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:${SERVICE_PORT}/health || exit 1

# Switch to non-root user
USER nestjs

# Expose port
EXPOSE ${SERVICE_PORT}

# Signal handling
ENTRYPOINT ["dumb-init", "--"]

# Start application
CMD ["sh", "-c", "node dist/apps/${SERVICE_NAME}/main.js"]

# =============================================================================
# Development stage - For local development
# =============================================================================
FROM dependencies AS development

ARG SERVICE_NAME
ARG SERVICE_PORT

# Copy scripts
COPY scripts/ ./scripts/
RUN chmod +x scripts/*.sh || true

# Copy source code
COPY . .

# Generate Prisma clients for development
RUN find apps -name "schema.prisma" -type f -exec npx prisma generate --schema={} \; || echo "No Prisma schemas found"

# Environment variables
ENV NODE_ENV=development
ENV SERVICE_NAME=${SERVICE_NAME}
ENV PORT=${SERVICE_PORT}

# Create logs directory
RUN mkdir -p /app/logs

# DON'T switch to non-root user in development (removed USER nestjs)
# This allows for easier debugging and file permissions

# Expose port
EXPOSE ${SERVICE_PORT}

# Start in development mode
CMD ["sh", "-c", "npm run start:dev ${SERVICE_NAME}"]