# Minimal License API

Ultra-lightweight Node.js backend for license validation.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set environment variables:
```bash
cp .env.example .env
# Edit .env with your DATABASE_URL
```

3. Initialize database:
```bash
psql $DATABASE_URL -f schema.sql
```

4. Start server:
```bash
npm start
```

## API Endpoints

### GET /license/:key
Validates a license key.

**Response (valid):**
```json
{
  "valid": true,
  "expires": "2025-12-31"
}
```

**Response (invalid):**
```json
{
  "valid": false
}
```

### GET /health
Health check endpoint.

## Environment Variables

- `DATABASE_URL` - PostgreSQL connection string (required)
- `PORT` - Server port (default: 8080)

## Requirements

- Node.js >= 18
- PostgreSQL

