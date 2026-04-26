-- CreateTable
CREATE TABLE IF NOT EXISTS "users" (
  "id" BIGSERIAL NOT NULL,
  "email" VARCHAR(255) NOT NULL,
  "first_name" VARCHAR(120) NOT NULL,
  "last_name" VARCHAR(120) NOT NULL,
  "password_hash" TEXT NOT NULL,
  "role" VARCHAR(50) NOT NULL DEFAULT 'admin',
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT NOW(),
  CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "contacts" (
  "id" BIGSERIAL NOT NULL,
  "name" VARCHAR(200) NOT NULL,
  "email" VARCHAR(255) NOT NULL,
  "phone" VARCHAR(50) NOT NULL,
  "topic" VARCHAR(100) NOT NULL,
  "message" TEXT NOT NULL,
  "accept_privacy" BOOLEAN NOT NULL DEFAULT false,
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT NOW(),
  CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "quotes" (
  "id" BIGSERIAL NOT NULL,
  "name" VARCHAR(200) NOT NULL,
  "email" VARCHAR(255) NOT NULL,
  "phone" VARCHAR(50) NOT NULL,
  "service_type" VARCHAR(100) NOT NULL,
  "departure_address" TEXT NOT NULL,
  "arrival_address" TEXT,
  "preferred_date" DATE,
  "details" TEXT NOT NULL,
  "accept_privacy" BOOLEAN NOT NULL DEFAULT false,
  "status" VARCHAR(50) NOT NULL DEFAULT 'pending',
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT NOW(),
  CONSTRAINT "quotes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "idx_contacts_created_at" ON "contacts"("created_at" DESC);

-- CreateIndex
CREATE INDEX IF NOT EXISTS "idx_quotes_created_at" ON "quotes"("created_at" DESC);

-- CreateIndex
CREATE INDEX IF NOT EXISTS "idx_quotes_status" ON "quotes"("status");
