# DriveEver Microservices Architecture Diagrams

This document contains Mermaid diagrams showing the system architecture and data flow for the DriveEver AI platform.

## System Architecture Overview

```mermaid
graph TB
    subgraph "Client Layer"
        WEB[Web Dashboard]
        MOBILE[Mobile App]
        API_CLIENT[API Clients]
    end

    subgraph "API Gateway"
        GATEWAY[NestJS Gateway<br/>Port: 3000]
    end

    subgraph "Core Services"
        PROMPT[Prompt Service<br/>Port: 3001]
        AI[AI Service<br/>Port: 3002]
        ANALYTICS[Analytics Service<br/>Port: 3003]
        USER[User Service<br/>Port: 3004]
        VEHICLE[Vehicle Service<br/>Port: 3005]
        NOTIFICATION[Notification Service<br/>Port: 3006]
    end

    subgraph "Data Layer"
        POSTGRES[(PostgreSQL<br/>Port: 5432)]
        REDIS[(Redis<br/>Port: 6379)]
    end

    subgraph "Monitoring"
        PROMETHEUS[Prometheus<br/>Port: 9090]
        GRAFANA[Grafana<br/>Port: 3001]
    end

    subgraph "External APIs"
        GEMINI[Google Gemini API]
        OPENAI[OpenAI API]
        CLAUDE[Anthropic Claude API]
        DVLA[DVLA API]
    end

    %% Client connections
    WEB --> GATEWAY
    MOBILE --> GATEWAY
    API_CLIENT --> GATEWAY

    %% Gateway routing
    GATEWAY --> PROMPT
    GATEWAY --> AI
    GATEWAY --> ANALYTICS
    GATEWAY --> USER
    GATEWAY --> VEHICLE
    GATEWAY --> NOTIFICATION

    %% Service to database connections
    PROMPT --> POSTGRES
    AI --> POSTGRES
    ANALYTICS --> POSTGRES
    USER --> POSTGRES
    VEHICLE --> POSTGRES
    NOTIFICATION --> POSTGRES

    %% Redis connections for caching and messaging
    PROMPT --> REDIS
    AI --> REDIS
    ANALYTICS --> REDIS
    USER --> REDIS
    VEHICLE --> REDIS
    NOTIFICATION --> REDIS

    %% External API connections
    AI --> GEMINI
    AI --> OPENAI
    AI --> CLAUDE
    VEHICLE --> DVLA

    %% Monitoring connections
    PROMETHEUS --> PROMPT
    PROMETHEUS --> AI
    PROMETHEUS --> ANALYTICS
    PROMETHEUS --> USER
    PROMETHEUS --> VEHICLE
    PROMETHEUS --> NOTIFICATION
    GRAFANA --> PROMETHEUS
```

## Order Creation Flow

```mermaid
sequenceDiagram
    participant Client
    participant Gateway
    participant UserService
    participant VehicleService
    participant PromptService
    participant AIService
    participant OrderService
    participant Database

    Client->>Gateway: POST /api/orders
    Gateway->>UserService: Validate user
    UserService->>Database: Check user exists
    UserService-->>Gateway: User validated

    Gateway->>VehicleService: Get vehicle data
    VehicleService->>Database: Fetch vehicle info
    VehicleService-->>Gateway: Vehicle data

    Gateway->>PromptService: Get optimal prompt
    PromptService->>Database: Query prompts
    PromptService-->>Gateway: Selected prompt

    Gateway->>AIService: Generate AI response
    AIService->>Database: Log request
    AIService-->>Gateway: AI response

    Gateway->>OrderService: Create order
    OrderService->>Database: Save order
    OrderService-->>Gateway: Order created

    Gateway-->>Client: Order response with AI advice
```

## Golden Prompt Library Data Flow

```mermaid
flowchart TD
    subgraph "Prompt Management"
        A[User Request] --> B[Prompt Categorization]
        B --> C[Golden Prompt Selection]
        C --> D[Template Rendering]
        D --> E[Variable Substitution]
    end

    subgraph "Optimization Layer"
        F[A/B Testing] --> G[Multi-Armed Bandit]
        G --> H[Performance Tracking]
        H --> I[Variant Selection]
    end

    subgraph "Versioning System"
        J[Prompt Versioning] --> K[Change Tracking]
        K --> L[Rollback Capability]
        L --> M[Version Comparison]
    end

    subgraph "Analytics & Monitoring"
        N[Real-time Analytics] --> O[Performance Metrics]
        O --> P[User Feedback]
        P --> Q[Optimization Insights]
    end

    E --> F
    I --> N
    M --> N
    Q --> C

    style A fill:#e1f5fe
    style C fill:#f3e5f5
    style I fill:#e8f5e8
    style Q fill:#fff3e0
```

## Database Schema Relationships

```mermaid
erDiagram
    USERS ||--o{ ORDERS : creates
    USERS ||--o{ VEHICLES : owns
    USERS ||--o{ AI_RESPONSES : requests

    ORDERS ||--o{ ORDER_ITEMS : contains
    ORDERS }o--|| USERS : belongs_to

    PROMPTS ||--o{ AI_RESPONSES : generates
    PROMPTS ||--o{ PROMPT_VERSIONS : has_versions
    PROMPTS ||--o{ PROMPT_TESTS : tested_by

    VEHICLES ||--o{ AI_RESPONSES : referenced_in
    VEHICLES }o--|| USERS : owned_by

    AI_RESPONSES }o--|| PROMPTS : uses
    AI_RESPONSES }o--|| USERS : requested_by
    AI_RESPONSES }o--o| VEHICLES : about

    USERS {
        uuid id PK
        string email
        string name
        timestamp created_at
        timestamp updated_at
    }

    ORDERS {
        uuid id PK
        uuid user_id FK
        enum status
        decimal total_amount
        timestamp created_at
        timestamp updated_at
    }

    ORDER_ITEMS {
        uuid id PK
        uuid order_id FK
        string product_type
        string name
        decimal unit_price
        int quantity
    }

    PROMPTS {
        uuid id PK
        string name
        enum category
        string version
        text template
        json variables
        json performance
        boolean is_active
        timestamp created_at
        timestamp updated_at
    }

    VEHICLES {
        uuid id PK
        uuid user_id FK
        string registration_number
        string make
        string model
        string year
        enum mot_status
        timestamp created_at
        timestamp updated_at
    }

    AI_RESPONSES {
        uuid id PK
        uuid prompt_id FK
        uuid user_id FK
        uuid vehicle_id FK
        string provider
        text question
        text answer
        int response_time
        boolean success
        timestamp created_at
    }
```

## Service Communication Patterns

```mermaid
graph LR
    subgraph "Synchronous Communication"
        A[HTTP/REST] --> B[API Gateway]
        B --> C[Service-to-Service]
    end

    subgraph "Asynchronous Communication"
        D[Redis Pub/Sub] --> E[Event-Driven]
        E --> F[Message Queues]
    end

    subgraph "Data Consistency"
        G[Saga Pattern] --> H[Event Sourcing]
        H --> I[CQRS]
    end

    subgraph "Caching Strategy"
        J[Redis Cache] --> K[Service Cache]
        K --> L[Database Cache]
    end

    style A fill:#e3f2fd
    style D fill:#f1f8e9
    style G fill:#fce4ec
    style J fill:#fff8e1
```

## Security Architecture

```mermaid
graph TB
    subgraph "Authentication & Authorization"
        A[JWT Tokens] --> B[OAuth 2.0]
        B --> C[Role-Based Access]
    end

    subgraph "Input Validation"
        D[Request Validation] --> E[SQL Injection Prevention]
        E --> F[XSS Protection]
    end

    subgraph "Output Sanitization"
        G[Response Sanitization] --> H[Data Masking]
        H --> I[Audit Logging]
    end

    subgraph "Network Security"
        J[HTTPS/TLS] --> K[API Rate Limiting]
        K --> L[Firewall Rules]
    end

    style A fill:#ffebee
    style D fill:#e8f5e8
    style G fill:#e1f5fe
    style J fill:#fff3e0
```

## Deployment Architecture

```mermaid
graph TB
    subgraph "Development Environment"
        DEV[Local Development<br/>Docker Compose]
    end

    subgraph "Staging Environment"
        STAGE[Kubernetes Cluster<br/>Staging]
    end

    subgraph "Production Environment"
        PROD[Kubernetes Cluster<br/>Production]
        LB[Load Balancer]
        CDN[CDN]
    end

    subgraph "CI/CD Pipeline"
        GIT[Git Repository]
        BUILD[Docker Build]
        TEST[Automated Tests]
        DEPLOY[Deploy to Staging]
        PROMOTE[Promote to Production]
    end

    DEV --> STAGE
    STAGE --> PROD
    GIT --> BUILD
    BUILD --> TEST
    TEST --> DEPLOY
    DEPLOY --> PROMOTE
    LB --> PROD
    CDN --> LB

    style DEV fill:#e8f5e8
    style STAGE fill:#fff3e0
    style PROD fill:#ffebee
    style GIT fill:#e1f5fe
```




