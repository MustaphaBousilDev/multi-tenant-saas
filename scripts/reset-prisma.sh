#!/bin/bash
set -e

echo "🔄 Resetting databases..."

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Confirm reset
read -p "⚠️  This will DELETE all data. Continue? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_error "Reset cancelled"
    exit 1
fi

# Reset each service database
for schema in apps/*/prisma/schema.prisma; do
  if [ -f "$schema" ]; then
    service_name=$(echo "$schema" | cut -d'/' -f2)
    print_warning "Resetting $service_name database..."
    
    npx prisma migrate reset --schema="$schema" --force
    print_success "✅ Reset $service_name"
  fi
done

print_success "🎉 All databases reset!"