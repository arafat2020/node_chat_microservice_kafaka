# 🚀 Event-Driven Microservices Chat Platform

A production-ready, scalable microservices architecture built with **NestJS**, **Apache Kafka**, and **Nx Monorepo**. This project demonstrates modern backend development practices including event-driven architecture, domain-driven design, and containerized infrastructure.

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Apache Kafka](https://img.shields.io/badge/Apache%20Kafka-231F20?style=for-the-badge&logo=apache-kafka&logoColor=white)](https://kafka.apache.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Nx](https://img.shields.io/badge/Nx-143055?style=for-the-badge&logo=nx&logoColor=white)](https://nx.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)

## 📋 Table of Contents

- [Overview](#-overview)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Microservices](#-microservices)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Event Patterns](#-event-patterns)
- [Database Schema](#-database-schema)
- [Development](#-development)
- [API Documentation](#-api-documentation)

## 🎯 Overview

This project is a **research and development initiative** exploring microservices architecture and event-driven design patterns using Apache Kafka. It implements a real-time chat platform with server/channel management, user authentication, file handling, and messaging capabilities.

### Key Features

✅ **Event-Driven Architecture** - Asynchronous communication using Apache Kafka  
✅ **Microservices Pattern** - Loosely coupled, independently deployable services  
✅ **Nx Monorepo** - Efficient code sharing and dependency management  
✅ **Type-Safe DTOs** - Shared data transfer objects across services  
✅ **Database per Service** - Each microservice manages its own PostgreSQL database  
✅ **Docker Compose** - Complete infrastructure orchestration  
✅ **Kafka UI** - Real-time monitoring of message streams  
✅ **API Gateway** - Centralized entry point with Swagger documentation  

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        API Gateway                          │
│                    (HTTP REST Interface)                    │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
    ┌────────────────────────────────────────┐
    │         Apache Kafka Broker            │
    │    (Event Bus & Message Queue)         │
    └─┬────────┬────────┬────────┬──────────┘
      │        │        │        │
      ▼        ▼        ▼        ▼
   ┌─────┐ ┌──────┐ ┌──────┐ ┌──────┐
   │Auth │ │Server│ │ Msg  │ │ File │
   │Svc  │ │ Svc  │ │ Svc  │ │ Svc  │
   └──┬──┘ └──┬───┘ └──┬───┘ └──┬───┘
      │       │        │        │
      ▼       ▼        ▼        ▼
    ┌────────────────────────────────┐
    │      PostgreSQL Databases      │
    └────────────────────────────────┘
```

### Communication Flow

1. **Client** → HTTP Request → **API Gateway**
2. **API Gateway** → Kafka Event → **Microservice**
3. **Microservice** → Process Event → Database Operation
4. **Microservice** → Kafka Response → **API Gateway**
5. **API Gateway** → HTTP Response → **Client**

## 🛠️ Tech Stack

### Core Technologies

| Technology | Purpose | Version |
|------------|---------|---------|
| **NestJS** | Backend framework | 11.x |
| **Apache Kafka** | Event streaming platform | 7.6.1 |
| **Nx** | Monorepo management | 21.5.2 |
| **TypeScript** | Programming language | 5.9.2 |
| **Prisma** | ORM & Database toolkit | 6.16.2 |
| **PostgreSQL** | Relational database | Latest |

### Infrastructure

- **Docker & Docker Compose** - Containerization
- **Zookeeper** - Kafka coordination service
- **Kafka UI** - Stream monitoring (Port 8080)
- **Swagger/OpenAPI** - API documentation

### Additional Libraries

- **class-validator** & **class-transformer** - DTO validation
- **argon2** - Password hashing
- **AWS SDK** - S3 file storage
- **BullMQ** - Job queue management
- **uuid** - Unique identifier generation

## 🔧 Microservices

### 1. **API Gateway** (`api_geteway`)
- **Port:** 3001
- **Type:** HTTP REST API
- **Responsibilities:**
  - Client-facing REST endpoints
  - Request routing to microservices
  - Swagger API documentation
  - Bearer token authentication
- **Endpoints:** `/api/docs` (Swagger UI)

### 2. **Auth Service** (`auth-service`)
- **Transport:** Kafka Microservice
- **Consumer Group:** `auth-consumer-group`
- **Responsibilities:**
  - User authentication & authorization
  - JWT token generation & validation
  - Password hashing with Argon2
  - User profile management
- **Message Patterns:**
  - `user.signin` - User login
  - `user.signup` - User registration
  - `user.verifyToken` - Token validation

### 3. **Server Service** (`server-service`)
- **Transport:** Kafka Microservice
- **Consumer Group:** `server-consumer-group`
- **Responsibilities:**
  - Discord-like server management
  - Channel creation & management
  - Member roles & permissions
  - Invite code generation
- **Message Patterns:**
  - `create.server`, `delete.server`, `update.server`
  - `get.server`, `get.involved.server`
  - `leave.server`, `is.server.exists`
  - `channel.create`, `channel.update`, `channel.delete`, `channel.get`

### 4. **Message Service** (`message-service`)
- **Transport:** Kafka Microservice
- **Consumer Group:** `message-consumer-group`
- **Responsibilities:**
  - Real-time message handling
  - Message persistence
  - Message history retrieval

### 5. **File Service** (`file-service`)
- **Port:** 3002
- **Transport:** Hybrid (HTTP + Kafka)
- **Consumer Group:** `file-service-consumer`
- **Responsibilities:**
  - File upload/download
  - AWS S3 integration
  - Presigned URL generation
  - File metadata management

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **Docker** & **Docker Compose**
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd node_chat
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start infrastructure services**
   ```bash
   docker compose up -d
   ```
   This starts:
   - Zookeeper (Port 2181)
   - Kafka Broker (Ports 9092, 29092)
   - Kafka UI (Port 8080)

4. **Set up environment variables**
   
   Each service has its own `.env` file. Configure:
   - Database URLs (PostgreSQL)
   - AWS credentials (for file service)
   - JWT secrets (for auth service)

5. **Run database migrations**
   ```bash
   # For each service with Prisma
   npx nx run auth-service:prisma-migrate
   npx nx run server-service:prisma-migrate
   npx nx run message-service:prisma-migrate
   npx nx run file-service:prisma-migrate
   ```

6. **Start all services**
   ```bash
   # API Gateway
   npx nx serve api_geteway

   # Microservices (in separate terminals)
   npx nx serve auth-service
   npx nx serve server-service
   npx nx serve message-service
   npx nx serve file-service
   ```

### Verify Installation

- **API Gateway:** http://localhost:3001/api
- **Swagger Docs:** http://localhost:3001/api/docs
- **Kafka UI:** http://localhost:8080

## 📁 Project Structure

```
node_chat/
├── apps/
│   ├── api_geteway/          # HTTP REST API Gateway
│   ├── auth-service/         # Authentication microservice
│   ├── server-service/       # Server & channel management
│   ├── message-service/      # Message handling
│   ├── file-service/         # File storage & retrieval
│   └── *-e2e/               # End-to-end tests
├── shared/                   # Shared library
│   └── src/
│       └── lib/
│           ├── dto/          # Data Transfer Objects
│           ├── guards/       # Auth guards
│           ├── interfaces/   # TypeScript interfaces
│           ├── types/        # Type definitions
│           └── pipes/        # Validation pipes
├── compose.yaml              # Docker Compose configuration
├── nx.json                   # Nx workspace configuration
└── package.json              # Root dependencies
```

### Shared Library

The `shared` library provides:
- **DTOs** - Type-safe data transfer objects for all services
- **Guards** - Microservice authentication guards
- **Interfaces** - Common TypeScript interfaces
- **Types** - Shared type definitions
- **Utilities** - Common helper functions

This ensures consistency across microservices and reduces code duplication.

## 📡 Event Patterns

### Authentication Events
```typescript
// user.signin
{ email: string, password: string }

// user.signup
{ name: string, email: string, password: string }

// user.verifyToken
{ token: string }
```

### Server Management Events
```typescript
// create.server
{ name: string, imageUrl: string, profileId: string }

// channel.create
{ name: string, type: 'TEXT' | 'AUDIO' | 'VIDEO', serverId: string }
```

## 🗄️ Database Schema

### Auth Service - Profile
```prisma
model Profile {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  password  String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Server Service - Server, Channel, Member
```prisma
model Server {
  id         String    @id @default(uuid())
  name       String
  imageUrl   String
  inviteCode String    @unique
  profileId  String
  members    Member[]
  channels   Channel[]
  createdAt  DateTime  @default(now())
  updatedAt  DateTime  @updatedAt
}

model Channel {
  id        String      @id @default(uuid())
  name      String
  type      ChannelType @default(TEXT)
  serverId  String
  profileId String
  createdAt DateTime    @default(now())
  updatedAt DateTime    @updatedAt
}

enum ChannelType { TEXT, AUDIO, VIDEO }
enum MemberRole { ADMIN, MODERATOR, GUEST }
```

## 💻 Development

### Run a specific service
```bash
npx nx serve <service-name>
```

### Build for production
```bash
npx nx build <service-name>
```

### Run tests
```bash
npx nx test <service-name>
npx nx e2e <service-name>-e2e
```

### View dependency graph
```bash
npx nx graph
```

### Lint code
```bash
npx nx lint <service-name>
```

### Generate Prisma client
```bash
npx nx run <service-name>:prisma-generate
```

## 📚 API Documentation

Once the API Gateway is running, access the interactive Swagger documentation:

**URL:** http://localhost:3001/api/docs

The Swagger UI provides:
- Complete API endpoint documentation
- Request/response schemas
- Try-it-out functionality
- Bearer token authentication

## 🎓 Learning Outcomes

This project demonstrates proficiency in:

- ✅ Designing and implementing microservices architecture
- ✅ Event-driven communication with Apache Kafka
- ✅ Managing monorepos with Nx
- ✅ Database design and ORM usage (Prisma)
- ✅ Docker containerization and orchestration
- ✅ RESTful API design and documentation
- ✅ Authentication and authorization patterns
- ✅ Type-safe development with TypeScript
- ✅ Code sharing and reusability strategies
- ✅ Scalable backend architecture patterns

## 🔮 Future Enhancements

- [ ] WebSocket integration for real-time messaging
- [ ] Redis caching layer
- [ ] Kubernetes deployment manifests
- [ ] CI/CD pipeline with GitHub Actions
- [ ] Distributed tracing with Jaeger
- [ ] Rate limiting and API throttling
- [ ] Comprehensive integration tests
- [ ] Message encryption
- [ ] Multi-tenancy support

## 📝 License

MIT

---

**Built with ❤️ as a research project exploring modern microservices architecture**
