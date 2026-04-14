# ChaiCode Authentication Service

A Node.js backend service for user authentication and movie ticket booking with JWT-based security.

## 📋 Project Overview

This is a learning project that demonstrates:
- User authentication (signup/signin) with JWT tokens
- Password hashing with HMAC-SHA256
- Movie ticket booking system
- PostgreSQL database with Drizzle ORM
- Express.js API with middleware authentication

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 17
- pnpm (or npm/yarn)

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env

# Start PostgreSQL (Docker)
pnpm run db:up

# Generate and run migrations
pnpm run db:generate
pnpm run db:migrate
```

### Development

```bash
# Start dev server with hot reload
pnpm run dev

# Build for production
pnpm run build

# Start production server
pnpm start
```

## 📁 Project Structure

```
src/
├── app/
│   ├── auth/
│   │   ├── controller.ts       # Auth business logic
│   │   ├── models.ts           # Zod validation schemas
│   │   ├── movie.controller.ts # Movie booking logic
│   │   ├── movie.modals.ts     # Movie booking schemas
│   │   ├── routes.ts           # Auth routes
│   │   └── utils/
│   │       └── token.ts        # JWT utilities
│   ├── middleware/
│   │   └── auth-middleware.ts  # Authentication middleware
│   └── index.ts                # Express app setup
├── db/
│   ├── index.ts                # Database connection
│   └── schema.ts               # Drizzle ORM schemas
└── index.ts                    # Server entry point
```

## 🔐 API Endpoints

### Authentication

#### Sign Up
```bash
curl -i -X POST http://localhost:8080/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Jane","lastName":"Doe","email":"jane.doe@example.com","password":"s3cretpw"}'
```

#### Sign In
```bash
curl -X POST http://localhost:8080/auth/sign-in \
  -H "Content-Type: application/json" \
  -d '{"email":"jane.doe@example.com","password":"s3cretpw"}'
```

**Response:**
```json
{
  "message": "Signin Success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkM2Y3YzZkLWNkMGMtNDNiZi1hNWMxLTBjZjk2MWI2YzExNCIsImlhdCI6MTc3NjE1MDcyOH0.nHpvudJGefroYgdWiWxZk1XtD6QRiJVNMgHx_mFTfFQ"
  }
}
```

#### Get Current User
```bash
curl -X GET http://localhost:8080/auth/me \
  -H "Authorization: Bearer <your-jwt-token>"
```

### Movie Booking

#### Book Movie Tickets
```bash
curl -X POST http://localhost:8080/auth/movie/book \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkM2Y3YzZkLWNkMGMtNDNiZi1hNWMxLTBjZjk2MWI2YzExNCIsImlhdCI6MTc3NjE1MDcyOH0.nHpvudJGefroYgdWiWxZk1XtD6QRiJVNMgHx_mFTfFQ" \
  -d '{
    "movieTitle": "Inception",
    "showTime": "2024-12-25T18:30:00Z",
    "seatNumbers": ["A1", "A2", "A3"],
    "seatsCount": 3,
    "priceCents": 7500
  }'
```

**Response:**
```json
{
  "booking": {
    "id": "1bed13c2-557f-4565-ae13-70fe8803fca3",
    "userId": "ad3f7c6d-cd0c-43bf-a5c1-0cf961b6c114",
    "movieTitle": "Inception",
    "showTime": "2024-12-25T18:30:00.000Z",
    "seatNumbers": "[\"A1\",\"A2\",\"A3\"]",
    "seatsCount": 3,
    "priceCents": 7500,
    "status": "confirmed",
    "createdAt": "2026-04-14T09:09:06.013Z",
    "updatedAt": "2026-04-14T09:09:05.922Z"
  }
}
```

#### Get My Bookings
```bash
curl -X GET http://localhost:8080/auth/movie/my-bookings \
  -H "Authorization: Bearer <your-jwt-token>"
```

## 🗄️ Database Schema

### Users Table
```sql
- id (UUID, primary key)
- firstName (varchar)
- lastName (varchar, optional)
- email (varchar, unique)
- emailVerified (boolean)
- password (varchar, hashed)
- salt (text)
- createdAt (timestamp)
- updatedAt (timestamp)
```

### Movie Bookings Table
```sql
- id (UUID, primary key)
- userId (UUID, foreign key → users.id)
- movieTitle (varchar)
- showTime (timestamp)
- seatNumbers (text, JSON string)
- seatsCount (integer)
- priceCents (integer)
- status (varchar, default: 'confirmed')
- createdAt (timestamp)
- updatedAt (timestamp)
```

## 🔒 Security Features

- **Password Hashing**: HMAC-SHA256 with random salt
- **JWT Authentication**: Signed tokens with expiry
- **Middleware Protection**: Routes protected with auth middleware
- **Input Validation**: Zod schemas for all endpoints

## 📦 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.x
- **Database**: PostgreSQL 17
- **ORM**: Drizzle ORM
- **Validation**: Zod
- **Auth**: JWT (jsonwebtoken)
- **Language**: TypeScript

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm run dev` | Start dev server with hot reload |
| `pnpm run build` | Build TypeScript to JavaScript |
| `pnpm start` | Run production build |
| `pnpm run db:up` | Start PostgreSQL container |
| `pnpm run db:down` | Stop PostgreSQL container |
| `pnpm run db:generate` | Generate migration files |
| `pnpm run db:migrate` | Run database migrations |
| `pnpm run studio` | Open Drizzle Studio GUI |

## 🌍 Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/chaicode
```

## 📝 Notes

- This is a learning project designed to understand backend authentication and booking flows
- JWT secret is hardcoded for simplicity (use environment variables in production)
- Seat numbers are stored as JSON strings in the database
- All prices are in cents (divide by 100 for display)

## 🤝 Contributing

This is a learning project. Feel free to fork and experiment!

## 📄 License

ISC