# DriveEver Microservices Deployment Script
# Complete deployment with database setup, AI integration, and monitoring

Write-Host "🚀 DriveEver Microservices Deployment" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green

# Check prerequisites
Write-Host "`n🔍 Checking Prerequisites..." -ForegroundColor Blue

# Check Docker
try {
    docker --version | Out-Null
    Write-Host "✅ Docker is available" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker is not installed. Please install Docker first." -ForegroundColor Red
    exit 1
}

# Check Docker Compose
try {
    docker-compose --version | Out-Null
    Write-Host "✅ Docker Compose is available" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker Compose is not installed. Please install Docker Compose first." -ForegroundColor Red
    exit 1
}

# Check Node.js
try {
    node --version | Out-Null
    Write-Host "✅ Node.js is available" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Create .env file if it doesn't exist
if (-not (Test-Path ".env")) {
    Write-Host "`n📝 Creating .env file..." -ForegroundColor Yellow
    $envContent = @"
# AI Provider API Keys (REPLACE WITH YOUR ACTUAL KEYS)
GEMINI_API_KEY=your_gemini_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# External Service API Keys
DVLA_API_KEY=your_dvla_api_key_here

# JWT Secret (CHANGE IN PRODUCTION)
JWT_SECRET=driveever_jwt_secret_key_2024_development_only

# Database Configuration
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=driveever

# Redis Configuration
REDIS_URL=redis://redis:6379

# Environment
NODE_ENV=development

# Service Ports
GATEWAY_PORT=3000
PROMPT_SERVICE_PORT=3001
AI_SERVICE_PORT=3002
ANALYTICS_SERVICE_PORT=3003
USER_SERVICE_PORT=3004
VEHICLE_SERVICE_PORT=3005
NOTIFICATION_SERVICE_PORT=3006

# Monitoring
PROMETHEUS_PORT=9090
GRAFANA_PORT=3001
"@
    $envContent | Out-File -FilePath ".env" -Encoding UTF8
    Write-Host "⚠️  Please update the .env file with your actual API keys!" -ForegroundColor Yellow
}

# Stop existing containers
Write-Host "`n🛑 Stopping existing containers..." -ForegroundColor Blue
docker-compose -f docker/docker-compose.yml down

# Build and start services
Write-Host "`n🏗️  Building and starting services..." -ForegroundColor Blue
docker-compose -f docker/docker-compose.yml up -d --build

# Wait for services to be ready
Write-Host "`n⏳ Waiting for services to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 30

# Test services
Write-Host "`n🧪 Testing services..." -ForegroundColor Blue
$testScript = "scripts/test-services.js"
if (Test-Path $testScript) {
    try {
        node $testScript
    } catch {
        Write-Host "❌ Test script failed. Check individual service health manually." -ForegroundColor Red
    }
} else {
    Write-Host "⚠️  Test script not found. Skipping automated tests." -ForegroundColor Yellow
}

# Display service URLs
Write-Host "`n🌐 Service URLs:" -ForegroundColor Cyan
Write-Host "   API Gateway:     http://localhost:3000" -ForegroundColor White
Write-Host "   Prompt Service:  http://localhost:3001" -ForegroundColor White
Write-Host "   AI Service:      http://localhost:3002" -ForegroundColor White
Write-Host "   Analytics:       http://localhost:3003" -ForegroundColor White
Write-Host "   User Service:    http://localhost:3004" -ForegroundColor White
Write-Host "   Vehicle Service: http://localhost:3005" -ForegroundColor White
Write-Host "   Notifications:   http://localhost:3006" -ForegroundColor White

Write-Host "`n📈 Monitoring:" -ForegroundColor Cyan
Write-Host "   Prometheus:      http://localhost:9090" -ForegroundColor White
Write-Host "   Grafana:         http://localhost:3001 (admin/admin)" -ForegroundColor White

Write-Host "`n🗄️  Database:" -ForegroundColor Cyan
Write-Host "   PostgreSQL:      localhost:5432" -ForegroundColor White
Write-Host "   Redis:           localhost:6379" -ForegroundColor White

Write-Host "`n📚 API Documentation:" -ForegroundColor Cyan
Write-Host "   Prompt Service:  http://localhost:3001/api/docs" -ForegroundColor White
Write-Host "   AI Service:      http://localhost:3002/api/docs" -ForegroundColor White

Write-Host "`n🎉 Deployment Complete!" -ForegroundColor Green
Write-Host "`nNext Steps:" -ForegroundColor Yellow
Write-Host "1. Update .env file with your actual API keys" -ForegroundColor White
Write-Host "2. Test AI functionality at http://localhost:3002/ai/test" -ForegroundColor White
Write-Host "3. View metrics in Grafana at http://localhost:3001" -ForegroundColor White
Write-Host "4. Check service logs: docker-compose -f docker/docker-compose.yml logs -f `[service-name`]" -ForegroundColor White

Write-Host "`n🛠️  Management Commands:" -ForegroundColor Yellow
Write-Host "   Stop all:        docker-compose -f docker/docker-compose.yml down" -ForegroundColor White
Write-Host "   View logs:       docker-compose -f docker/docker-compose.yml logs -f `[service-name`]" -ForegroundColor White
Write-Host "   Restart:         docker-compose -f docker/docker-compose.yml restart `[service-name`]" -ForegroundColor White
Write-Host "   Scale service:   docker-compose -f docker/docker-compose.yml up -d --scale `[service-name`]=2" -ForegroundColor White
