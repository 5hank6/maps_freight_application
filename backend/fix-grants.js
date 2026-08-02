const { Client } = require('pg');
const client = new Client({ connectionString: 'postgresql://postgres.sgjovrsntkqyxbcqakxa:Aman%403094%405102@aws-1-ap-northeast-2.pooler.supabase.com:5432/postgres' });
async function run() {
  await client.connect();
  console.log("Connected to DB.");
  try {
    await client.query('GRANT SELECT ON "Broker" TO anon, authenticated;');
    await client.query('GRANT SELECT ON "Shipper" TO anon, authenticated;');
    await client.query('GRANT SELECT ON "TruckOwner" TO anon, authenticated;');
    console.log("Granted SELECT to anon and authenticated.");
  } catch (e) {
    console.error("Error:", e);
  } finally {
    await client.end();
  }
}
run();
