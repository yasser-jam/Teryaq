#!/bin/bash

# Teryaq Pharmacy Development Docker Deployment Script

echo "🚀 Starting Teryaq Pharmacy DEVELOPMENT deployment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if .env.local file exists
if [ ! -f .env.local ]; then
    echo "⚠️  .env.local file not found. Creating basic configuration..."
    cat > .env.local << EOF
NODE_ENV=development
BASE_URL=http://localhost:3000
NEXT_TELEMETRY_DISABLED=1
# Backend API URL - update with your actual backend URL
NEXT_PUBLIC_API_URL=http://teryaq-backend:3000
API_URL=http://teryaq-backend:3000
# Database connection (if needed)
DATABASE_URL=postgresql://postgres:password@teryaq-db:5432/teryaq
EOF
    echo "📝 Basic .env.local file created. Please edit it with your configuration."
fi

# Build and start the development application
echo "🔨 Building Docker image for development..."
docker-compose -f docker-compose.dev.yml build

echo "🚀 Starting development services..."
docker-compose -f docker-compose.dev.yml up -d

echo "✅ Development deployment completed!"
echo "🌐 Application is running at: http://localhost:3000"
echo "🔥 Hot reload is enabled for development"

# Show logs
echo "📋 Showing logs (press Ctrl+C to exit):"
docker-compose -f docker-compose.dev.yml logs -f
