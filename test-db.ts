import fs from 'fs';
import pg from 'pg';
const { Pool } = pg;

const env = fs.readFileSync('.env', 'utf8');
const match = env.match(/DATABASE_URL=(.*)/);
const url = match ? match[1].trim() : null;

async function test() {
    if (!url) {
        console.error('DATABASE_URL not found in .env');
        process.exit(1);
    }
    const pool = new Pool({ connectionString: url });
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('Connection successful:', res.rows[0]);
        await pool.end();
    } catch (err) {
        console.error('Connection failed:', err);
        process.exit(1);
    }
}

test();
