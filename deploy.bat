@echo off
REM Teryaq Pharmacy Docker Deployment Script for Windows

echo 🚀 Starting Teryaq Pharmacy deployment...

REM Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not running. Please start Docker and try again.
    pause
    exit /b 1
)

REM Check if .env.production file exists
if not exist .env.production (
    echo ⚠️  .env.production file not found. Creating basic configuration...
    echo NODE_ENV=production > .env.production
    echo BASE_URL=http://localhost:3000 >> .env.production
    echo NEXT_TELEMETRY_DISABLED=1 >> .env.production
    echo # Backend API URL - update with your actual backend URL >> .env.production
    echo NEXT_PUBLIC_API_URL=http://teryaq-backend:3000 >> .env.production
    echo API_URL=http://teryaq-backend:3000 >> .env.production
    echo # Database connection (if needed) >> .env.production
    echo DATABASE_URL=postgresql://postgres:password@teryaq-db:5432/teryaq >> .env.production
    echo 📝 Basic .env.production file created. Please edit it with your configuration.
)

REM Build and start the application
echo 🔨 Building Docker image...
docker-compose build

echo 🚀 Starting services...
docker-compose up -d

echo ✅ Deployment completed!
echo 🌐 Application is running at: http://localhost:3000
echo 📊 Health check: http://localhost:3000/api/health

REM Show logs
echo 📋 Showing logs (press Ctrl+C to exit):
docker-compose logs -f

pause
