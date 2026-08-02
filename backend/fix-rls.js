const { Client } = require('pg');
const client = new Client({ connectionString: 'postgresql://postgres.sgjovrsntkqyxbcqakxa:Aman%403094%405102@aws-1-ap-northeast-2.pooler.supabase.com:5432/postgres' });
async function run() {
  await client.connect();
  console.log("Connected to DB.");
  try {
    await client.query('ALTER TABLE "Broker" DISABLE ROW LEVEL SECURITY;');
    await client.query('ALTER TABLE "Shipper" DISABLE ROW LEVEL SECURITY;');
    await client.query('ALTER TABLE "TruckOwner" DISABLE ROW LEVEL SECURITY;');
    console.log("RLS disabled for Broker, Shipper, TruckOwner.");
  } catch (e) {
    console.error("Error:", e);
  } finally {
    await client.end();
  }
}
run();
