const { Client } = require('pg');

const connectionString = 'postgresql://postgres.sgjovrsntkqyxbcqakxa:Aman%403094%405102@aws-1-ap-northeast-2.pooler.supabase.com:5432/postgres';

const query = `
-- Update Broker Table
ALTER TABLE "Broker" ADD COLUMN IF NOT EXISTS wallet numeric DEFAULT 0;
ALTER TABLE "Broker" ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending';
ALTER TABLE "Broker" ADD COLUMN IF NOT EXISTS approved boolean DEFAULT false;
ALTER TABLE "Broker" ADD COLUMN IF NOT EXISTS tier text DEFAULT 'free_preview';
ALTER TABLE "Broker" ADD COLUMN IF NOT EXISTS unlocks integer DEFAULT 0;
ALTER TABLE "Broker" ADD COLUMN IF NOT EXISTS deals integer DEFAULT 0;
ALTER TABLE "Broker" ADD COLUMN IF NOT EXISTS violations integer DEFAULT 0;

-- Update Shipper Table
ALTER TABLE "Shipper" ADD COLUMN IF NOT EXISTS wallet numeric DEFAULT 0;
ALTER TABLE "Shipper" ADD COLUMN IF NOT EXISTS status text DEFAULT 'active';

-- Update TruckOwner Table
ALTER TABLE "TruckOwner" ADD COLUMN IF NOT EXISTS wallet numeric DEFAULT 0;
ALTER TABLE "TruckOwner" ADD COLUMN IF NOT EXISTS status text DEFAULT 'active';

-- Create GoodsListings
CREATE TABLE IF NOT EXISTS "GoodsListings" (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "by" text,
    "byRole" text,
    type text,
    wt numeric,
    "from" text,
    "to" text,
    date text,
    addr text,
    rate text,
    notes text,
    status text DEFAULT 'live',
    views integer DEFAULT 0,
    "unlockCount" integer DEFAULT 0,
    "contactName" text,
    "contactPhone" text,
    "createdAt" timestamp with time zone DEFAULT now()
);

-- Create TruckListings
CREATE TABLE IF NOT EXISTS "TruckListings" (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "by" text,
    type text,
    cap numeric,
    city text,
    "to" text,
    date text,
    detour boolean DEFAULT false,
    "truckNo" text,
    "ownerName" text,
    "ownerPhone" text,
    "driverName" text,
    "driverPhone" text,
    parking text,
    status text DEFAULT 'live',
    views integer DEFAULT 0,
    "unlockCount" integer DEFAULT 0,
    "createdAt" timestamp with time zone DEFAULT now()
);

-- Create Unlocks
CREATE TABLE IF NOT EXISTS "Unlocks" (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "by" text,
    kind text,
    lid text,
    amount numeric,
    deal text DEFAULT 'pending',
    "createdAt" timestamp with time zone DEFAULT now()
);

-- Create Chats
CREATE TABLE IF NOT EXISTS "Chats" (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "unlockId" text,
    "from" text,
    text text,
    blocked boolean DEFAULT false,
    "createdAt" timestamp with time zone DEFAULT now()
);

-- Disable RLS for all new tables so the frontend can read/write directly (since it's a prototype transitioning to production)
ALTER TABLE "GoodsListings" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "TruckListings" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "Unlocks" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "Chats" DISABLE ROW LEVEL SECURITY;
`;

async function run() {
  const client = new Client({ connectionString });
  try {
    await client.connect();
    console.log("Connected to DB.");
    await client.query(query);
    console.log("Database schema updated successfully.");
  } catch (e) {
    console.error("Error updating schema:", e);
  } finally {
    await client.end();
  }
}

run();
