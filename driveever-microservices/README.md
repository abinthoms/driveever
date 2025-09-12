# DriveEver Microservices Architecture

This repository contains the microservices architecture for the DriveEver AI platform, built with NestJS and TypeScript.

## Architecture Overview

The system is designed as a collection of microservices that work together to provide comprehensive AI-powered vehicle advice and management services.

### Core Services

1. **prompt-service** - Manages the Golden Prompt Library and prompt optimization
2. **ai-service** - Handles AI provider integrations and response processing
3. **analytics-service** - Real-time analytics and performance tracking
4. **user-service** - User management and authentication
5. **vehicle-service** - Vehicle data management and MOT/tax information
6. **notification-service** - Real-time notifications and WebSocket management

### Shared Components

- **common** - Shared interfaces, DTOs, and utilities
- **database** - Database configurations and migrations
- **gateway** - API Gateway for routing and load balancing

## Technology Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL with TypeORM
- **Message Queue**: Redis with Bull
- **API Gateway**: NestJS Gateway
- **Containerization**: Docker & Docker Compose
- **Monitoring**: Prometheus & Grafana
- **Logging**: Winston with ELK Stack

## Getting Started

1. Clone the repository
2. Run `docker-compose up -d` to start all services
3. Access the API Gateway at `http://localhost:3000`
4. View the dashboard at `http://localhost:3001`

## Development

Each service can be developed and deployed independently. See individual service README files for specific setup instructions.




