<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Urban Services API

Backend service for managing urban service requests using NestJS, Prisma and PostgreSQL.

## Prerequisites

- Node.js >= 20
- Docker and Docker Compose (for containerized setup)
- PostgreSQL (for local setup)

## Environment Setup

Copy the example environment file and adjust the values:

```bash
cp .env.example .env
```

## Running Locally (Without Docker)

1. Install dependencies:
```bash
npm install
```

2. Generate Prisma client:
```bash
npx prisma generate
```

3. Run database migrations:
```bash
npx prisma migrate deploy
```

4. Start the development server:
```bash
npm run start:dev
```

The API will be available at http://localhost:3000

## Running with Docker

1. Build and start the containers:
```bash
npm run docker:dev
# or
docker-compose up -d
```

2. View logs:
```bash
npm run docker:logs
# or
docker-compose logs -f
```

3. Stop containers:
```bash
npm run docker:down
# or
docker-compose down
```

The API will be available at http://localhost:3000

## API Documentation

Once the application is running, you can access the Swagger documentation at:
http://localhost:3000/api

## Default Admin User

The system automatically creates a default admin user on first run:
- Email: `admin@example.com`
- Password: `123456`

## Available Scripts

```bash
# development
npm run start:dev

# production build
npm run build
npm run start:prod

# tests
npm run test        # unit tests
npm run test:e2e    # e2e tests
npm run test:cov    # test coverage

# docker commands
npm run docker:dev   # start containers
npm run docker:down  # stop containers
npm run docker:logs  # view logs
```

## Project Structure

```
src/
├── auth/           # Authentication related files
├── dto/            # Data Transfer Objects
├── enums/          # Enumerations
├── prisma/         # Database connection and models
├── service-requests/  # Service requests module
└── validators/     # Custom validators
```

## Features

- Service request management (CRUD operations)
- JWT-based authentication
- Role-based access control
- PostgreSQL database with Prisma ORM
- API documentation with Swagger
- Docker support
- Environment configuration
- Input validation
- Error handling

## Testing

```bash
# Run unit tests
npm run test

# Run unit tests in watch mode
npm run test:watch

# Run end-to-end tests
npm run test:e2e

# Generate test coverage report
npm run test:cov

# Debug tests
npm run test:debug

# Run specific test file
npm test service-requests.service.spec.ts
```

### Available Tests

The project includes tests for:

- `service-requests.controller.spec.ts`: API endpoints tests
- `service-requests.service.spec.ts`: Business logic tests
- `auth.controller.spec.ts`: Authentication routes tests
- `auth.service.spec.ts`: Authentication logic tests

### Test Coverage Goals

- Unit Tests: >80% coverage
- E2E Tests: All critical paths tested
- Integration Tests: Database operations verified

### Test Examples

```typescript
describe('ServiceRequests', () => {
  describe('POST /service-requests', () => {
    it('should create new request', async () => {
      // Tests request creation
    });
  });

  describe('PATCH /service-requests/:id/status', () => {
    it('should update status', async () => {
      // Tests status update
    });
  });
});
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the License - see the LICENSE file for details.
