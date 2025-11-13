-- Minimal licenses table schema
CREATE TABLE IF NOT EXISTS licenses (
    key VARCHAR(255) PRIMARY KEY,
    expires DATE NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_licenses_key ON licenses(key);

