# DriveEver Microservices Development Startup Script (PowerShell)
# Starts all services in development mode with hot reloading

Write-Host "Starting DriveEver Microservices Development Environment..." -ForegroundColor Green

# Check if Docker is running
try {
    docker info | Out-Null
    Write-Host "Docker is running" -ForegroundColor Green
} catch {
    Write-Host "Docker is not running. Please start Docker and try again." -ForegroundColor Red
    exit 1
}

# Check if Docker Compose is available
try {
    docker-compose --version | Out-Null
    Write-Host "Docker Compose is available" -ForegroundColor Green
} catch {
    Write-Host "Docker Compose is not installed. Please install Docker Compose and try again." -ForegroundColor Red
    exit 1
}

# Create .env file if it doesn't exist
if (-not (Test-Path ".env")) {
    Write-Host "Creating .env file..." -ForegroundColor Yellow
    $envContent = @"
# API Keys (replace with your actual keys)
GEMINI_API_KEY=AIzaSyDummyKeyForDevelopment123456789
OPENAI_API_KEY=sk-dummyKeyForDevelopment123456789
ANTHROPIC_API_KEY=sk-ant-dummyKeyForDevelopment123456789
DVLA_API_KEY=dummy_dvla_key_for_development

# JWT Secret
JWT_SECRET=driveever_jwt_secret_key_2024_development_only

# Database Configuration
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=driveever

# Redis Configuration
REDIS_URL=redis://redis:6379

# Environment
NODE_ENV=development
"@
    $envContent | Out-File -FilePath ".env" -Encoding UTF8
    
    Write-Host "Please update the .env file with your actual API keys before starting the services." -ForegroundColor Yellow
}

# Start services
Write-Host "Starting Docker containers..." -ForegroundColor Blue
docker-compose -f docker/docker-compose.yml up -d

# Wait for services to be ready
Write-Host "Waiting for services to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Check service health
Write-Host "Checking service health..." -ForegroundColor Blue
$services = @(
    @{Name="gateway"; Port=3000},
    @{Name="prompt-service"; Port=3001},
    @{Name="ai-service"; Port=3002},
    @{Name="analytics-service"; Port=3003},
    @{Name="user-service"; Port=3004},
    @{Name="vehicle-service"; Port=3005},
    @{Name="notification-service"; Port=3006}
)

foreach ($service in $services) {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:$($service.Port)/health" -TimeoutSec 5 -ErrorAction Stop
        Write-Host "$($service.Name) is healthy" -ForegroundColor Green
    } catch {
        Write-Host "$($service.Name) is not responding" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "DriveEver Microservices Development Environment is ready!" -ForegroundColor Green
Write-Host ""
Write-Host "Service URLs:" -ForegroundColor Cyan
Write-Host "   API Gateway:     http://localhost:3000" -ForegroundColor White
Write-Host "   Prompt Service:  http://localhost:3001" -ForegroundColor White
Write-Host "   AI Service:      http://localhost:3002" -ForegroundColor White
Write-Host "   Analytics:       http://localhost:3003" -ForegroundColor White
Write-Host "   User Service:    http://localhost:3004" -ForegroundColor White
Write-Host "   Vehicle Service: http://localhost:3005" -ForegroundColor White
Write-Host "   Notifications:   http://localhost:3006" -ForegroundColor White
Write-Host ""
Write-Host "Monitoring:" -ForegroundColor Cyan
Write-Host "   Prometheus:      http://localhost:9090" -ForegroundColor White
Write-Host "   Grafana:         http://localhost:3001 (admin/admin)" -ForegroundColor White
Write-Host ""
Write-Host "Database:" -ForegroundColor Cyan
Write-Host "   PostgreSQL:      localhost:5432" -ForegroundColor White
Write-Host "   Redis:           localhost:6379" -ForegroundColor White
Write-Host ""
Write-Host "To stop all services: docker-compose -f docker/docker-compose.yml down" -ForegroundColor Yellow
Write-Host "To view logs: docker-compose -f docker/docker-compose.yml logs -f [service-name]" -ForegroundColor Yellow
