# 🚀 Multi-Tenant SaaS Platform

A scalable, enterprise-grade multi-tenant Software-as-a-Service platform built with modern technologies and microservices architecture.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Technologies](#technologies)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Microservices](#microservices)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

This multi-tenant SaaS platform provides a robust foundation for building enterprise applications that serve multiple clients (tenants) from a single instance. The platform includes essential features like tenant management, user authentication, billing, analytics, integrations, and customization capabilities.

### Key Benefits

- **🏢 Multi-Tenancy**: Complete tenant isolation with configurable data separation strategies
- **⚡ Scalable**: Microservices architecture allows independent scaling of components
- **🔒 Secure**: Built-in authentication, authorization, and tenant-level security
- **💰 Monetization**: Integrated billing and subscription management
- **📊 Analytics**: Comprehensive analytics and reporting capabilities
- **🔧 Customizable**: White-labeling and tenant-specific customizations
- **🔌 Extensible**: Easy integration with third-party services

## 🏗️ Architecture

The platform follows a microservices architecture with the following components:

```
┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   API Gateway   │
│   (React/Vue)   │◄──►│   (GraphQL)     │
└─────────────────┘    └─────────┬───────┘
                                 │
                    ┌────────────┴────────────┐
                    │     Message Queue       │
                    │     (RabbitMQ)         │
                    └────────────┬────────────┘
                                 │
┌────────────────────────────────┼────────────────────────────────┐
│                                │                                │
▼                                ▼                                ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Tenant    │    │    Auth     │    │   Billing   │    │ Analytics   │
│  Service    │    │  Service    │    │  Service    │    │  Service    │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       ▼                   ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  PostgreSQL │    │  PostgreSQL │    │  PostgreSQL │    │  PostgreSQL │
│ (Tenants DB)│    │ (Users DB)  │    │(Billing DB) │    │(Analytics)  │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

## 🛠️ Technologies

### Backend
- **[NestJS](https://nestjs.com/)** - Progressive Node.js framework
- **[GraphQL](https://graphql.org/)** - Query language and runtime
- **[TypeScript](https://www.typescriptlang.org/)** - Typed JavaScript
- **[RabbitMQ](https://www.rabbitmq.com/)** - Message broker
- **[PostgreSQL](https://www.postgresql.org/)** - Primary database
- **[TypeORM](https://typeorm.io/)** - Database ORM
- **[Redis](https://redis.io/)** - Caching and session storage

### DevOps & Infrastructure
- **[Docker](https://www.docker.com/)** - Containerization
- **[Docker Compose](https://docs.docker.com/compose/)** - Multi-container orchestration
- **[Jest](https://jestjs.io/)** - Testing framework

### Security & Authentication
- **[JWT](https://jwt.io/)** - JSON Web Tokens
- **[Passport](http://www.passportjs.org/)** - Authentication middleware
- **[bcrypt](https://github.com/kelektiv/node.bcrypt.js)** - Password hashing

## ✨ Features

### 🏢 Tenant Management
- Multi-tenant architecture with data isolation
- Tenant onboarding and provisioning
- Resource allocation and quotas
- Tenant lifecycle management

### 🔐 Authentication & Authorization
- Multi-tenant user authentication
- Role-based access control (RBAC)
- Single Sign-On (SSO) support
- JWT token management

### 💳 Billing & Subscriptions
- Flexible subscription plans
- Usage-based billing
- Payment processing integration
- Invoice generation and management

### 📊 Analytics & Reporting
- Real-time analytics dashboard
- Custom report generation
- Usage metrics and KPIs
- Data export capabilities

### 🔌 Integrations
- Third-party API integrations
- Webhook management
- Developer API portal
- Custom integration marketplace

### 🎨 Customization
- White-labeling and branding
- Custom fields and workflows
- Tenant-specific configurations
- UI/UX personalization

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Docker** and **Docker Compose**
- **Git**

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/multi-tenant-saas-platform.git
cd multi-tenant-saas-platform
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```bash
# Application
NODE_ENV=development
PORT=4000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=multi_tenant_saas

# RabbitMQ
RABBITMQ_URL=amqp://localhost:5672

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRATION=3600

# Frontend
FRONTEND_URL=http://localhost:3000
```

### 4. Start Infrastructure Services

```bash
docker-compose up -d
```

This will start:
- PostgreSQL database (port 5432)
- RabbitMQ message broker (port 5672, management UI: 15672)
- Redis cache (port 6379)

### 5. Start the Application

```bash
# Start API Gateway
npm run start:api-gateway

# Start microservices (in separate terminals)
npm run start:tenant-service
npm run start:auth-service
npm run start:billing-service
npm run start:analytics-service
npm run start:integration-service
npm run start:customization-service
```

## 📖 Usage

### GraphQL Playground

Access the GraphQL playground at: http://localhost:4000/graphql

### RabbitMQ Management

Access the RabbitMQ management interface at: http://localhost:15672
- Username: `admin`
- Password: `password`

### Example GraphQL Queries

```graphql
# Get all tenants
query {
  tenants {
    id
    name
    status
    createdAt
  }
}

# Create a new tenant
mutation {
  createTenant(input: {
    name: "Acme Corp"
    email: "admin@acme.com"
    plan: "enterprise"
  }) {
    id
    name
    status
  }
}
```

## 📁 Project Structure

```
multi-tenant-saas/
├── apps/                          # Microservices applications
│   ├── api-gateway/               # GraphQL API Gateway
│   ├── tenant-service/            # Tenant management
│   ├── auth-service/              # Authentication
│   ├── billing-service/           # Billing and subscriptions
│   ├── analytics-service/         # Analytics and reporting
│   ├── integration-service/       # Third-party integrations
│   └── customization-service/     # Customization features
├── libs/                          # Shared libraries
│   ├── common/                    # Common utilities
│   ├── database/                  # Database configurations
│   ├── rabbitmq/                  # Message queue setup
│   └── auth-guard/                # Authentication guards
├── docker-compose.yml             # Development infrastructure
├── Dockerfile                     # Production container
├── nest-cli.json                  # NestJS CLI configuration
└── README.md                      # This file
```

## 📚 API Documentation

### GraphQL Schema

The API uses GraphQL for unified data access. Key types include:

- **Tenant**: Organization/customer entity
- **User**: Individual user within a tenant
- **Subscription**: Billing subscription
- **Feature**: Available platform features
- **Integration**: Third-party service connections

### Message Queue Events

Services communicate via RabbitMQ events:

- `tenant.created` - New tenant registered
- `user.registered` - New user signed up
- `subscription.updated` - Billing changes
- `usage.tracked` - Feature usage metrics

## 🔧 Microservices

### API Gateway
- **Port**: 4000
- **Purpose**: GraphQL API aggregation and routing
- **Database**: None (stateless)

### Tenant Service
- **Port**: 3001
- **Purpose**: Tenant lifecycle management
- **Database**: `tenant_db`
- **Queue**: `tenant_queue`

### Auth Service
- **Port**: 3002
- **Purpose**: Authentication and authorization
- **Database**: `auth_db`
- **Queue**: `auth_queue`

### Billing Service
- **Port**: 3003
- **Purpose**: Subscriptions and payments
- **Database**: `billing_db`
- **Queue**: `billing_queue`

### Analytics Service
- **Port**: 3004
- **Purpose**: Metrics and reporting
- **Database**: `analytics_db`
- **Queue**: `analytics_queue`

### Integration Service
- **Port**: 3005
- **Purpose**: Third-party integrations
- **Database**: `integration_db`
- **Queue**: `integration_queue`

### Customization Service
- **Port**: 3006
- **Purpose**: Tenant customizations
- **Database**: `customization_db`
- **Queue**: `customization_queue`

## 🗃️ Database Schema

### Tenant Isolation Strategies

The platform supports multiple tenant isolation strategies:

1. **Shared Database, Shared Schema** (Row-level security)
2. **Shared Database, Separate Schema** (Schema per tenant)
3. **Separate Database** (Database per tenant)

Configure via environment variables in each service.

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov

# Watch mode
npm run test:watch
```

## 🔧 Development

### Adding a New Service

```bash
# Generate new microservice
nest generate app new-service

# Add to docker-compose.yml
# Configure in nest-cli.json
# Set up message queues
```

### Adding Shared Libraries

```bash
# Generate new library
nest generate library shared-feature

# Import in services that need it
```

## 🚀 Deployment

### Production Build

```bash
npm run build
```

### Docker Production

```bash
docker build -t multi-tenant-saas .
docker run -p 4000:4000 multi-tenant-saas
```

### Environment Variables

Set the following in production:

```bash
NODE_ENV=production
DATABASE_URL=postgresql://...
RABBITMQ_URL=amqps://...
JWT_SECRET=secure-production-secret
REDIS_URL=redis://...
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Follow TypeScript best practices
- Use ESLint and Prettier for formatting
- Write tests for new features
- Update documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) for the amazing framework
- [Apollo GraphQL](https://www.apollographql.com/) for GraphQL implementation
- [RabbitMQ](https://www.rabbitmq.com/) for reliable messaging
- [TypeORM](https://typeorm.io/) for database abstraction

## 📞 Support

- 📧 Email: support@yourcompany.com
- 💬 Discord: [Your Discord Server](https://discord.gg/yourserver)
- 📖 Documentation: [docs.yourcompany.com](https://docs.yourcompany.com)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/multi-tenant-saas-platform/issues)

---

⭐ **Star this repository if you find it helpful!**
