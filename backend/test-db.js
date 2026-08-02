const { Client } = require('pg');
const client = new Client({ connectionString: 'postgresql://postgres.sgjovrsntkqyxbcqakxa:Aman%403094%405102@aws-1-ap-northeast-2.pooler.supabase.com:5432/postgres' });
async function run() {
  await client.connect();
  const res = await client.query('SELECT * FROM "Broker" WHERE mobile = \'7405242163\'');
  console.log("Broker Rows:", res.rows);
  const res2 = await client.query('SELECT * FROM "Shipper" WHERE mobile = \'7405242163\'');
  console.log("Shipper Rows:", res2.rows);
  const res3 = await client.query('SELECT * FROM "TruckOwner" WHERE mobile = \'7405242163\'');
  console.log("TruckOwner Rows:", res3.rows);
  await client.end();
}
run();
