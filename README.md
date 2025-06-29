# HiveChat - Real-time Chat Application

A scalable real-time chat application built with Hexagonal Architecture using NestJS, MongoDB, Kafka, and WebSocket.

## Architecture Overview

This application implements Hexagonal Architecture (Ports and Adapters) pattern with three main layers:

### Domain Layer

- Contains business logic and rules
- Defines interfaces (ports) for external dependencies
- Pure TypeScript with no external dependencies
- Houses core entities and value objects

### Application Layer

- Implements use cases using domain entities
- Orchestrates flow between domain and infrastructure
- Depends only on domain interfaces

### Infrastructure Layer

- Implements adapters for external services
- Contains concrete implementations of ports
- Handles framework-specific code (NestJS, Mongoose, etc.)

```
src/
├── modules/
│   ├── users/
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   │   └── user.entity.ts
│   │   │   ├── ports/
│   │   │   │   ├── user-repository.port.ts
│   │   │   └── value-objects/
│   │   │       └── email.value-object.ts
│   │   ├── application/
│   │   │   ├── dtos/
│   │   │   │   └── user.dto.ts
│   │   │   └── services/
│   │   │       └── user.service.ts
|   |   |   └── ports/
│   │   │       └── user-service.port.ts
│   │   ├── infrastructure/
│   │   │   ├── adapters/
│   │   │   │   ├── mongoose/
│   │   │   │   │   └── user.repository.ts
│   │   │   │   └── http/
│   │   │   │       └── user.controller.ts
│   │   │   └── schemas/
│   │   │       └── user.schema.ts
│   │   └── users.module.ts
│   │
│   ├── conversations/
│   │   └── [Similar structure as users]
│   │
│   ├── messages/
│   │   └── [Similar structure as users]
│   │
│   └── shared/
│       ├── auth/
│       │   └── [Authentication module]
│       ├── kafka/
│       │   └── [Kafka infrastructure]
│       ├── websocket/
│       │   └── [WebSocket infrastructure]
│       └── database/
│           └── [Database configuration]
│
├── app.module.ts
└── main.ts

```

# Hexagonal Architecture

## Architecture Layers

### Domain Layer (domain/)

- Contains core business logic
- Independent of infrastructure
- Includes:
  - entities/: Domain models (UserEntity)
  - ports/: Interfaces for repositories
  - value-objects/: Immutable, validated domain concepts

### Application Layer (application/)

- Contains application-specific logic
- Coordinates domain entities
- Includes:
  - dtos/: Data Transfer Objects
  - services/: Application services that use domain entities
  - ports/: Interfaces for services

### Infrastructure Layer (infrastructure/)

- Implements concrete adapters
- Contains technology-specific implementations
- Includes:
  - adapters/:
    - mongoose/: Database-specific repository
    - http/: REST API controllers
  - schemas/: Database schemas (e.g., Mongoose schema)

### Key Principles

- Domain layer is independent
- Infrastructure adapts to domain, not vice versa
- Clear separation of concerns
- Dependency rule: Inner layers (domain) don't depend on outer layers

## Tech Stack

- **Backend Framework**: NestJS
- **Database**: MongoDB with Mongoose
- **Message Broker**: Apache Kafka
- **WebSocket**: Socket.IO
- **Language**: TypeScript
- **Container**: Docker
- **Testing**: Jest

## Core Modules

- Users Management
- Group Management
- Real-time Messaging
- Message Persistence

## Prerequisites

- Docker and Docker Compose
- Node.js (v18+)
- npm/yarn

## Getting Started

1. Clone the repository:
2. Install dependencies:

```bash
make bootstrap
```

3. Start the development environment:

```bash
make up
```

4. Run the application:

```bash
yarn start:dev
```

## Development Workflow

1. Define domain entities and ports
2. Implement application services
3. Create infrastructure adapters
4. Wire everything using NestJS dependency injection

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Docker Support

The application includes Docker configuration for development and production environments:

```bash
# Development
docker-compose up -d

# Production
docker-compose -f docker-compose.prod.yml up -d
```

## Project Structure Benefits

- **Maintainability**: Clear separation of concerns
- **Testability**: Easy to test business logic in isolation
- **Flexibility**: Infrastructure can be changed without affecting core logic
- **Scalability**: Independent scaling of components

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
