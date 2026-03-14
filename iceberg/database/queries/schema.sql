-- iceberg/database/schema.sql

CREATE TABLE IF NOT EXISTS app_settings
(
    key   TEXT PRIMARY KEY,
    value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS accounts
(
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    name          TEXT    NOT NULL,
    type          TEXT    NOT NULL,
    bank          TEXT    NOT NULL,
    balance_cents INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS transactions
(
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    date         DATETIME DEFAULT CURRENT_TIMESTAMP,
    amount_cents INTEGER NOT NULL,
    account_id   INTEGER,
    category     TEXT,
    note         TEXT,
    receipt_path TEXT,
    FOREIGN KEY (account_id) REFERENCES accounts (id)
);

CREATE TABLE IF NOT EXISTS products
(
    id          TEXT PRIMARY KEY,
    name        TEXT    NOT NULL,
    price_cents INTEGER NOT NULL,
    stock       INTEGER DEFAULT 0,
    category    TEXT,
    image_path  TEXT
);

CREATE TABLE IF NOT EXISTS clients
(
    id                   INTEGER PRIMARY KEY AUTOINCREMENT,
    name                 TEXT NOT NULL,
    phone                TEXT,
    credit_balance_cents INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS store_sales
(
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    date        DATETIME DEFAULT CURRENT_TIMESTAMP,
    client_id   INTEGER,
    total_cents INTEGER NOT NULL,
    is_credit   BOOLEAN  DEFAULT 0,
    FOREIGN KEY (client_id) REFERENCES clients (id)
);
CREATE TABLE IF NOT EXISTS receipts
(
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    account_id   INTEGER NOT NULL,
    amount_cents INTEGER NOT NULL,
    date         TEXT    NOT NULL,
    description  TEXT,
    type         TEXT    NOT NULL DEFAULT 'expense',
    FOREIGN KEY (account_id) REFERENCES accounts (id) ON DELETE CASCADE
);