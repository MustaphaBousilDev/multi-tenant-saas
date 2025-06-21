ARG SERVICE_NAME
ARG SERVICE_PORT=3000

FROM node:18-alpine AS base
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY nest-cli.json ./
COPY tsconfig*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the specific service
RUN npm run build ${SERVICE_NAME}

# Expose the port
EXPOSE ${SERVICE_PORT}

# Set environment variables
ENV SERVICE_NAME=${SERVICE_NAME}
ENV PORT=${SERVICE_PORT}

# Start the application
CMD ["sh", "-c", "node dist/apps/${SERVICE_NAME}/main.js"]