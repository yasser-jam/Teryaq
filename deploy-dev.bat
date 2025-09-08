@echo off
REM Teryaq Pharmacy Development Docker Deployment Script for Windows

echo 🚀 Starting Teryaq Pharmacy DEVELOPMENT deployment...

REM Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not running. Please start Docker and try again.
    pause
    exit /b 1
)

REM Check if .env.local file exists
if not exist .env.local (
    echo ⚠️  .env.local file not found. Creating basic configuration...
    echo NODE_ENV=development > .env.local
    echo BASE_URL=http://localhost:3001 >> .env.local
    echo NEXT_TELEMETRY_DISABLED=1 >> .env.local
    echo # Backend API URL - update with your actual backend URL >> .env.local
    echo NEXT_PUBLIC_API_URL=http://teryaq-backend:3000 >> .env.local
    echo API_URL=http://teryaq-backend:3000 >> .env.local
    echo # Database connection (if needed) >> .env.local
    echo DATABASE_URL=postgresql://postgres:password@teryaq-db:5432/teryaq >> .env.local
    echo 📝 Basic .env.local file created. Please edit it with your configuration.
)

REM Build and start the development application
echo 🔨 Building Docker image for development...
docker-compose -f docker-compose.dev.yml build

echo 🚀 Starting development services...
docker-compose -f docker-compose.dev.yml up -d

echo ✅ Development deployment completed!
echo 🌐 Application is running at: http://localhost:3001
echo 🔥 Hot reload is enabled for development

REM Show logs
echo 📋 Showing logs (press Ctrl+C to exit):
docker-compose -f docker-compose.dev.yml logs -f

pause
