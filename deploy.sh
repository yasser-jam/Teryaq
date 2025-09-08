#!/bin/bash

# Teryaq Pharmacy Docker Deployment Script

echo "🚀 Starting Teryaq Pharmacy deployment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if .env.production file exists
if [ ! -f .env.production ]; then
    echo "⚠️  .env.production file not found. Creating basic configuration..."
    cat > .env.production << EOF
NODE_ENV=production
BASE_URL=http://localhost:3000
NEXT_TELEMETRY_DISABLED=1
# Backend API URL - update with your actual backend URL
NEXT_PUBLIC_API_URL=http://teryaq-backend:3000
API_URL=http://teryaq-backend:3000
# Database connection (if needed)
DATABASE_URL=postgresql://postgres:password@teryaq-db:5432/teryaq
EOF
    echo "📝 Basic .env.production file created. Please edit it with your configuration."
fi

# Build and start the application
echo "🔨 Building Docker image..."
docker-compose build

echo "🚀 Starting services..."
docker-compose up -d

echo "✅ Deployment completed!"
echo "🌐 Application is running at: http://localhost:3000"
echo "📊 Health check: http://localhost:3000/api/health"

# Show logs
echo "📋 Showing logs (press Ctrl+C to exit):"
docker-compose logs -f
