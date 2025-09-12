#!/bin/bash

# DriveEver Microservices Development Startup Script
# Starts all services in development mode with hot reloading

echo "🚀 Starting DriveEver Microservices Development Environment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose and try again."
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
# API Keys (replace with your actual keys)
GEMINI_API_KEY=your_gemini_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
DVLA_API_KEY=your_dvla_api_key_here

# JWT Secret
JWT_SECRET=your_jwt_secret_here

# Database Configuration
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=driveever

# Redis Configuration
REDIS_URL=redis://redis:6379

# Environment
NODE_ENV=development
EOF
    echo "⚠️  Please update the .env file with your actual API keys before starting the services."
fi

# Start services
echo "🐳 Starting Docker containers..."
docker-compose -f docker/docker-compose.yml up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check service health
echo "🔍 Checking service health..."
services=("gateway:3000" "prompt-service:3001" "ai-service:3002" "analytics-service:3003" "user-service:3004" "vehicle-service:3005" "notification-service:3006")

for service in "${services[@]}"; do
    IFS=':' read -r name port <<< "$service"
    if curl -f http://localhost:$port/health > /dev/null 2>&1; then
        echo "✅ $name is healthy"
    else
        echo "❌ $name is not responding"
    fi
done

echo ""
echo "🎉 DriveEver Microservices Development Environment is ready!"
echo ""
echo "📊 Service URLs:"
echo "   API Gateway:     http://localhost:3000"
echo "   Prompt Service:  http://localhost:3001"
echo "   AI Service:      http://localhost:3002"
echo "   Analytics:       http://localhost:3003"
echo "   User Service:    http://localhost:3004"
echo "   Vehicle Service: http://localhost:3005"
echo "   Notifications:   http://localhost:3006"
echo ""
echo "📈 Monitoring:"
echo "   Prometheus:      http://localhost:9090"
echo "   Grafana:         http://localhost:3001 (admin/admin)"
echo ""
echo "🗄️  Database:"
echo "   PostgreSQL:      localhost:5432"
echo "   Redis:           localhost:6379"
echo ""
echo "🛠️  To stop all services: docker-compose -f docker/docker-compose.yml down"
echo "📋 To view logs: docker-compose -f docker/docker-compose.yml logs -f [service-name]"




