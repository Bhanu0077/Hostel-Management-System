# FinHost AI Backend

Node.js + Express + PostgreSQL backend for FinHost AI with JWT authentication, hostel management, expenses tracking, and AI-style operational insights.

## Tech Stack

- Node.js
- Express
- PostgreSQL
- JWT authentication
- Clean architecture with `routes -> controllers -> services -> repository/database`

## Project Structure

```text
src/
  config/
  middleware/
  modules/
    ai-insights/
    auth/
    expenses/
    rooms/
    students/
    users/
  routes/
  utils/
database/
  schema.sql
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from `.env.example` and update values:

```env
PORT=4000
NODE_ENV=development
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/finhost_ai
JWT_SECRET=change-this-secret
JWT_EXPIRES_IN=1d
```

3. Create the database and run the schema:

```bash
psql -U postgres -d finhost_ai -f database/schema.sql
```

4. Start the server:

```bash
npm run dev
```

Base URL: `http://localhost:4000`

## Default Login

- Email: `admin@finhost.ai`
- Password: `Admin@123`

## API Documentation

### Authentication

#### `POST /login`

Request:

```json
{
  "email": "admin@finhost.ai",
  "password": "Admin@123"
}
```

Response:

```json
{
  "token": "jwt-token",
  "user": {
    "id": "uuid",
    "fullName": "System Admin",
    "email": "admin@finhost.ai",
    "role": "admin"
  }
}
```

Use the JWT in protected requests:

```http
Authorization: Bearer <token>
```

### Students

#### `GET /students`

Returns all students with room information.

#### `POST /students`

Request:

```json
{
  "fullName": "Aarav Sharma",
  "email": "aarav@example.com",
  "phone": "9876543210",
  "gender": "male",
  "guardianName": "Rakesh Sharma",
  "guardianPhone": "9876500000",
  "joinedOn": "2026-04-26",
  "status": "active",
  "roomId": "room-uuid"
}
```

#### `PUT /students/:studentId`

Updates student details and reassigns the room if `roomId` changes.

### Rooms

#### `GET /rooms`

Returns room inventory with current occupants.

#### `POST /rooms`

Request:

```json
{
  "blockName": "C",
  "roomNumber": "C-301",
  "capacity": 2,
  "roomType": "premium",
  "monthlyRent": 9200,
  "status": "available"
}
```

#### `POST /rooms/:roomId/allocate`

Request:

```json
{
  "studentId": "student-uuid"
}
```

Allocates a student to a room and adjusts occupancy counts.

### Expenses

#### `GET /expenses`

Optional query params:

- `category`
- `month` in `YYYY-MM`

Response includes expense items plus totals grouped by category.

#### `POST /expenses`

Request:

```json
{
  "title": "Electricity Bill",
  "category": "utilities",
  "amount": 18500,
  "expenseDate": "2026-04-25",
  "notes": "April electricity charges"
}
```

### AI Insights

#### `GET /ai-insights`

Returns:

- Occupancy metrics
- Room status distribution
- Expense category highlights
- Actionable recommendations generated from current database data

## Example Protected Request

```bash
curl http://localhost:4000/students \
  -H "Authorization: Bearer <token>"
```

## Notes

- PostgreSQL UUID generation uses `gen_random_uuid()`, which requires the `pgcrypto` extension in most environments. If needed, run:

```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;
```

- The `/ai-insights` module uses rule-based summaries over live hostel and expense data, which keeps the API deterministic and database-backed.
