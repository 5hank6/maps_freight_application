const { Client } = require('pg');

const connectionString = 'postgresql://postgres.sgjovrsntkqyxbcqakxa:Aman%403094%405102@aws-1-ap-northeast-2.pooler.supabase.com:5432/postgres';

const query = `
CREATE OR REPLACE FUNCTION check_user_login(phone_input text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    clean_phone text;
    phone_with_code text;
    found_user json;
BEGIN
    -- Strip non-numeric chars
    clean_phone := regexp_replace(phone_input, '\\D', '', 'g');
    -- Get last 10 digits
    IF length(clean_phone) >= 10 THEN
        clean_phone := right(clean_phone, 10);
    END IF;
    
    phone_with_code := '+91' || clean_phone;

    -- Check Broker
    SELECT json_build_object(
        'id', id, 'role', 'broker', 'name', name, 'mobile', mobile, 'location', location
    ) INTO found_user
    FROM "Broker"
    WHERE mobile = clean_phone OR mobile = phone_with_code
    LIMIT 1;

    IF found_user IS NOT NULL THEN
        RETURN found_user;
    END IF;

    -- Check Shipper
    SELECT json_build_object(
        'id', id, 'role', 'shipper', 'name', name, 'mobile', mobile, 'location', "baseCity"
    ) INTO found_user
    FROM "Shipper"
    WHERE mobile = clean_phone OR mobile = phone_with_code
    LIMIT 1;

    IF found_user IS NOT NULL THEN
        RETURN found_user;
    END IF;

    -- Check TruckOwner
    SELECT json_build_object(
        'id', id, 'role', 'transporter', 'name', name, 'mobile', mobile, 'location', "baseCity"
    ) INTO found_user
    FROM "TruckOwner"
    WHERE mobile = clean_phone OR mobile = phone_with_code
    LIMIT 1;

    RETURN found_user; -- returns null if not found
END;
$$;
`;

async function run() {
  const client = new Client({ connectionString });
  try {
    await client.connect();
    console.log("Connected to DB.");
    await client.query(query);
    console.log("RPC function check_user_login created successfully.");
  } catch (e) {
    console.error("Error creating RPC:", e);
  } finally {
    await client.end();
  }
}

run();
