const { Client } = require('pg');

const connectionString = 'postgresql://postgres.sgjovrsntkqyxbcqakxa:Aman%403094%405102@aws-1-ap-northeast-2.pooler.supabase.com:5432/postgres';

const query = `
-- Seed Users (Assuming they already exist from login test, let's just update the broker for the test)
-- But we don't know their exact UUIDs. Let's insert dummy listings for them.
-- We'll use random UUIDs for the 'by' fields just so there is data.

INSERT INTO "GoodsListings" ("by", "byRole", type, wt, "from", "to", date, addr, rate, notes, status, views, "unlockCount", "contactName", "contactPhone")
VALUES 
('d1a3b4c5-6789-0123-4567-89abcdef0123', 'shipper', 'Chemicals', 12, 'Gandhidham', 'Delhi', '2026-07-12', 'GIDC Phase 2, Plot 47, Gandhidham', '₹40,000–45,000', 'Hazardous cargo, needs closed body with docs', 'live', 14, 0, 'Rajesh Patel', '9812345001'),
('d1a3b4c5-6789-0123-4567-89abcdef0124', 'transporter', 'Textiles', 8, 'Gandhidham', 'Ahmedabad', '2026-07-11', 'Anjar Road Warehouse 3', '₹18,000–22,000', '', 'live', 9, 0, 'Mahesh Singh', '9812345002'),
('d1a3b4c5-6789-0123-4567-89abcdef0123', 'shipper', 'FMCG', 15, 'Mundra', 'Ludhiana', '2026-07-13', 'Mundra SEZ Gate 2', '₹55,000', 'Palletized, forklift at pickup', 'live', 22, 0, 'Rajesh Patel', '9812345001')
ON CONFLICT DO NOTHING;

INSERT INTO "TruckListings" ("by", type, cap, city, "to", date, detour, "truckNo", "ownerName", "ownerPhone", "driverName", "driverPhone", parking, status, views, "unlockCount")
VALUES
('d1a3b4c5-6789-0123-4567-89abcdef0124', 'Closed Body', 20, 'Gandhidham', 'Delhi / North India', '2026-07-11', true, 'GJ-12-AB-1234', 'Mahesh Singh', '9812345002', 'Ramesh Kumar', '8812345678', 'Gandhidham Truck Terminal, Gate 3', 'live', 11, 0),
('d1a3b4c5-6789-0123-4567-89abcdef0124', 'Open Body', 14, 'Gandhidham', 'Ahmedabad', '2026-07-12', false, 'GJ-12-CD-5678', 'Mahesh Singh', '9812345002', 'Sohan Lal', '8812349999', 'Adipur bypass parking', 'live', 6, 0)
ON CONFLICT DO NOTHING;
`;

async function run() {
  const client = new Client({ connectionString });
  try {
    await client.connect();
    console.log("Connected to DB.");
    await client.query(query);
    console.log("Database seeded successfully.");
  } catch (e) {
    console.error("Error seeding data:", e);
  } finally {
    await client.end();
  }
}

run();
