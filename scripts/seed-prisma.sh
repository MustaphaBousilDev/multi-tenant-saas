#!/bin/bash
set -e

echo "🌱 Seeding databases..."

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

# Seed each service database
for schema in apps/*/prisma/schema.prisma; do
  if [ -f "$schema" ]; then
    service_name=$(echo "$schema" | cut -d'/' -f2)
    seed_file="apps/$service_name/prisma/seed.ts"
    
    if [ -f "$seed_file" ]; then
      print_info "Seeding $service_name database..."
      npx prisma db seed --schema="$schema"
      print_success "✅ Seeded $service_name"
    else
      print_info "No seed file found for $service_name"
    fi
  fi
done

print_success "🎉 All databases seeded!"