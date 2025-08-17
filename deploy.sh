#!/bin/bash

# Deploy script for Ubuntu server

echo "🚀 Starting deployment..."

# Set your domain here
DOMAIN="yourdomain.com"

# Update .env.production with actual domain
sed -i "s/yourdomain.com/$DOMAIN/g" .env.production

echo "📦 Building Docker images..."

# Build frontend image
docker build -t attech-frontend:latest .

echo "🏃 Starting services..."

# Start services with docker-compose
docker-compose up -d

echo "✅ Deployment completed!"
echo "Frontend: http://$DOMAIN"
echo "Backend API: https://$DOMAIN:7276"

# Show running containers
docker ps

echo "📋 To view logs:"
echo "Frontend: docker logs attech-frontend"
echo "Backend: docker logs attech-backend"