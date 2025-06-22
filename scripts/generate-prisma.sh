#!/bin/bash

echo "🔧 Starting Prisma client generation..."

# Find and generate Prisma clients
for schema in apps/*/prisma/schema.prisma; do
  if [ -f "$schema" ]; then
    service_name=$(basename $(dirname $(dirname "$schema")))
    echo "📦 Generating Prisma client for: $service_name"
    npx prisma generate --schema="$schema" || echo "⚠️ Warning: Failed to generate for $service_name"
  fi
done

echo "✅ Prisma generation completed!"
exit 0