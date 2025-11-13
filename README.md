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

### GET /
Root health check endpoint (returns "OK" for Koyeb health checks).

### GET /health
Health check endpoint (returns JSON: `{ "status": "ok" }`).

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

## Environment Variables

**Option 1: Using DATABASE_URL (recommended for Koyeb)**
- `DATABASE_URL` - PostgreSQL connection string (e.g., `postgresql://user:password@host:port/database`)
- `DATABASE_SSL` - Set to `false` to disable SSL (default: enabled with `rejectUnauthorized: false`)
- `PORT` - Server port (default: 8080)

**Option 2: Using separate variables**
- `DATABASE_HOST` - PostgreSQL host
- `DATABASE_PORT` - PostgreSQL port (default: 5432)
- `DATABASE_USER` - PostgreSQL user
- `DATABASE_PASSWORD` - PostgreSQL password
- `DATABASE_NAME` - PostgreSQL database name
- `DATABASE_SSL` - Set to `false` to disable SSL (default: enabled with `rejectUnauthorized: false`)
- `PORT` - Server port (default: 8080)

## Requirements

- Node.js >= 18
- PostgreSQL

