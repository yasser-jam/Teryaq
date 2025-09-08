# Quick Start Guide - Teryaq Pharmacy Docker Deployment

## 🚀 Ready to Deploy!

Your `Teryaq` project is now ready for Docker deployment with the same configuration as your working `teryaq-pharmacy-owner` project.

## 📁 Files Created

✅ **Docker Configuration:**
- `Dockerfile` - Production Docker image
- `Dockerfile.dev` - Development Docker image
- `docker-compose.yml` - Production deployment
- `docker-compose.dev.yml` - Development deployment
- `docker-compose.nginx.yml` - Full stack with Nginx
- `nginx.conf` - Nginx reverse proxy configuration
- `.dockerignore` - Optimized build process

✅ **Deployment Scripts:**
- `deploy.bat` / `deploy.sh` - Production deployment
- `deploy-dev.bat` / `deploy-dev.sh` - Development deployment

✅ **Documentation:**
- `DOCKER_README.md` - Comprehensive deployment guide

## 🎯 How to Deploy

### Option 1: Production Deployment (Recommended)
```bash
# Windows
deploy.bat

# Linux/Mac
./deploy.sh
```

### Option 2: Development Deployment
```bash
# Windows
deploy-dev.bat

# Linux/Mac
./deploy-dev.sh
```

### Option 3: Full Stack with Nginx
```bash
# Production with Nginx reverse proxy
docker-compose -f docker-compose.nginx.yml up -d
```

## 🔧 Key Features

- **Cookie Issues Fixed**: Proper HTTP/HTTPS cookie handling
- **Backend Integration**: Connects to your existing `teryaq-backend` and `teryaq-db`
- **Network Integration**: Uses your existing `teryaq_teryaq-net` network
- **Security**: Non-root user, security headers, rate limiting
- **Performance**: Resource limits, compression, caching
- **Monitoring**: Health checks and logging

## 🌐 Access Points

- **Application**: http://localhost:3001
- **Health Check**: http://localhost:3001/api/health
- **With Nginx**: http://localhost (port 80)

## 🔍 Environment Variables

The deployment scripts will automatically create basic environment files:
- `.env.production` for production
- `.env.local` for development

**Important**: Update the backend URLs in these files to match your actual backend configuration.

## 🚨 Prerequisites

1. **Backend Running**: Make sure your `teryaq-backend` and `teryaq-db` containers are running
2. **Network**: Ensure the `teryaq_teryaq-net` network exists
3. **Docker**: Docker Desktop must be running

## 📋 Next Steps

1. **Start your backend** (if not already running):
   ```bash
   cd /path/to/your/backend
   docker-compose up -d
   ```

2. **Deploy the frontend**:
   ```bash
   cd D:\Teryaq
   deploy.bat  # or deploy.sh
   ```

3. **Access your application**:
   - Open http://localhost:3001 in your browser
   - Check logs: `docker-compose logs -f`

## 🆘 Troubleshooting

- **Port conflicts**: Change port 3001 in docker-compose files if needed
- **Backend connection**: Verify backend containers are running and accessible
- **Network issues**: Check if `teryaq_teryaq-net` network exists
- **Cookie issues**: Ensure BASE_URL matches your actual domain

## 📚 Full Documentation

For detailed information, see `DOCKER_README.md` which includes:
- Complete deployment guide
- Troubleshooting section
- Security considerations
- Performance optimization
- Backup and restore procedures

---

**Your Teryaq project is now ready for production deployment! 🎉**
