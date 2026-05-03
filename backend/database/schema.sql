CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role VARCHAR(40) NOT NULL DEFAULT 'admin',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  block_name VARCHAR(80) NOT NULL,
  room_number VARCHAR(20) NOT NULL UNIQUE,
  capacity INTEGER NOT NULL CHECK (capacity > 0),
  occupied_beds INTEGER NOT NULL DEFAULT 0 CHECK (occupied_beds >= 0),
  room_type VARCHAR(40) NOT NULL,
  monthly_rent NUMERIC(10, 2) NOT NULL CHECK (monthly_rent >= 0),
  status VARCHAR(30) NOT NULL DEFAULT 'available',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  gender VARCHAR(20),
  guardian_name VARCHAR(120),
  guardian_phone VARCHAR(20),
  joined_on DATE NOT NULL DEFAULT CURRENT_DATE,
  status VARCHAR(30) NOT NULL DEFAULT 'active',
  room_id UUID REFERENCES rooms(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(150) NOT NULL,
  category VARCHAR(80) NOT NULL,
  amount NUMERIC(12, 2) NOT NULL CHECK (amount >= 0),
  expense_date DATE NOT NULL,
  notes TEXT,
  created_by UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO users (full_name, email, password_hash, role)
VALUES (
  'System Admin',
  'admin@finhost.ai',
  '$2b$10$usvYZoEbMD7AVB5RQFPpt.txn1FpoAb/sR9YfSHU1Z20qH41JLGfy',
  'admin'
)
ON CONFLICT (email) DO NOTHING;

INSERT INTO rooms (block_name, room_number, capacity, occupied_beds, room_type, monthly_rent, status)
VALUES
  ('A', 'A-101', 3, 0, 'standard', 6500.00, 'available'),
  ('A', 'A-102', 2, 0, 'premium', 8000.00, 'available'),
  ('B', 'B-201', 4, 0, 'shared', 5500.00, 'available')
ON CONFLICT (room_number) DO NOTHING;
