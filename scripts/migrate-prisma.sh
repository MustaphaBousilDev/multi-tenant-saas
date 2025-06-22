#!/bin/bash
set -e

echo "🚀 Running Prisma migrations..."

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Get environment
ENVIRONMENT=${NODE_ENV:-development}
SERVICE_NAME=${SERVICE_NAME:-"all"}

print_info "Environment: $ENVIRONMENT"
print_info "Service: $SERVICE_NAME"

# Function to run migration for a service
run_migration() {
    local schema_path=$1
    local service_name=$(echo "$schema_path" | cut -d'/' -f2)
    
    print_info "Running migration for $service_name..."
    
    if [ "$ENVIRONMENT" = "production" ]; then
        # Production: deploy migrations
        npx prisma migrate deploy --schema="$schema_path"
    else
        # Development: apply migrations
        npx prisma migrate dev --schema="$schema_path" --name "auto-migration"
    fi
    
    print_success "Migration completed for $service_name"
}

# Run migrations
if [ "$SERVICE_NAME" = "all" ]; then
    # Run for all services
    for schema in apps/*/prisma/schema.prisma; do
        if [ -f "$schema" ]; then
            run_migration "$schema"
        fi
    done
else
    # Run for specific service
    schema="apps/$SERVICE_NAME/prisma/schema.prisma"
    if [ -f "$schema" ]; then
        run_migration "$schema"
    else
        print_warning "No Prisma schema found for service: $SERVICE_NAME"
    fi
fi

print_success "🎉 All migrations completed!"