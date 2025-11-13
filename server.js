const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 8080;

// PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 5, // Minimal pool size for low memory usage
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// License validation endpoint
app.get('/license/:key', async (req, res) => {
  const { key } = req.params;

  if (!key || key.trim().length === 0) {
    return res.status(400).json({ valid: false });
  }

  try {
    const result = await pool.query(
      'SELECT expires, active FROM licenses WHERE key = $1',
      [key.trim()]
    );

    if (result.rows.length === 0) {
      return res.json({ valid: false });
    }

    const license = result.rows[0];
    const now = new Date();
    const expires = new Date(license.expires);

    if (!license.active || expires < now) {
      return res.json({ valid: false });
    }

    res.json({
      valid: true,
      expires: license.expires.toISOString().split('T')[0]
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ valid: false });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`License API running on port ${PORT}`);
});

