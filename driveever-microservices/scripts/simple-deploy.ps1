# DriveEver Microservices Simple Deployment Script

Write-Host "DriveEver Microservices Deployment" -ForegroundColor Green
Write-Host "===================================" -ForegroundColor Green

# Check Docker
try {
    docker --version | Out-Null
    Write-Host "Docker is available" -ForegroundColor Green
} catch {
    Write-Host "Docker is not installed. Please install Docker first." -ForegroundColor Red
    exit 1
}

# Create .env file if it doesn't exist
if (-not (Test-Path ".env")) {
    Write-Host "Creating .env file..." -ForegroundColor Yellow
    $envContent = @"
GEMINI_API_KEY=your_gemini_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
DVLA_API_KEY=your_dvla_api_key_here
JWT_SECRET=driveever_jwt_secret_key_2024_development_only
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=driveever
REDIS_URL=redis://redis:6379
NODE_ENV=development
"@
    $envContent | Out-File -FilePath ".env" -Encoding UTF8
    Write-Host "Please update the .env file with your actual API keys!" -ForegroundColor Yellow
}

# Stop existing containers
Write-Host "Stopping existing containers..." -ForegroundColor Blue
docker-compose -f docker/docker-compose.yml down

# Start services
Write-Host "Starting services..." -ForegroundColor Blue
docker-compose -f docker/docker-compose.yml up -d

# Wait for services
Write-Host "Waiting for services to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 20

# Display URLs
Write-Host "Service URLs:" -ForegroundColor Cyan
Write-Host "   API Gateway:     http://localhost:3000" -ForegroundColor White
Write-Host "   Prompt Service:  http://localhost:3001" -ForegroundColor White
Write-Host "   AI Service:      http://localhost:3002" -ForegroundColor White
Write-Host "   Analytics:       http://localhost:3003" -ForegroundColor White
Write-Host "   User Service:    http://localhost:3004" -ForegroundColor White
Write-Host "   Vehicle Service: http://localhost:3005" -ForegroundColor White
Write-Host "   Notifications:   http://localhost:3006" -ForegroundColor White

Write-Host "Monitoring:" -ForegroundColor Cyan
Write-Host "   Prometheus:      http://localhost:9090" -ForegroundColor White
Write-Host "   Grafana:         http://localhost:3001" -ForegroundColor White

Write-Host "Deployment Complete!" -ForegroundColor Green




