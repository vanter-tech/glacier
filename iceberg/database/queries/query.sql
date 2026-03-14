-- iceberg/database/queries/query.sql

-- name: SetAppSetting :exec
INSERT OR
REPLACE
INTO app_settings (key, value)
VALUES (?, ?);

-- name: GetAppSetting :one
SELECT value
FROM app_settings
WHERE key = ?
LIMIT 1;

-- name: CreateAccount :one
INSERT INTO accounts (name, type, bank, balance_cents)
VALUES (?, ?, ?, ?)
RETURNING *;

-- name: UpdateAccountBalance :exec
UPDATE accounts
SET balance_cents = balance_cents + ?
WHERE id = ?;

-- name: DeleteAccount :exec
DELETE
FROM accounts
WHERE id = ?;

-- name: GetAllAccounts :many
SELECT *
FROM accounts;

-- name: GetAccountById :one
SELECT *
FROM accounts
WHERE id = ?;

-- name: CreateReceipt :one
INSERT INTO receipts (account_id, amount_cents, date, description, type)
VALUES (?, ?, ?, ?, ?)
RETURNING *;

-- name: GetReceiptsByAccount :many
SELECT *
FROM receipts
WHERE account_id = ?
ORDER BY date DESC;

-- name: GetAllReceipts :many
SELECT *
FROM receipts
ORDER BY id DESC;

-- name: GetReceiptById :one
SELECT *
FROM receipts
WHERE id = ?;

-- name: DeleteReceiptById :exec
DELETE
FROM receipts
WHERE id = ?;

-- name: GetTotalBalance :one
SELECT CAST(COALESCE(SUM(balance_cents), 0) AS INTEGER)
FROM accounts;

-- name: GetTotalSpent :one
SELECT CAST(COALESCE(SUM(amount_cents), 0) AS INTEGER)
FROM receipts;

-- name: GetTotalSpentByDateRange :one
SELECT CAST(COALESCE(SUM(amount_cents), 0) AS INTEGER)
FROM receipts
WHERE date >= ?
  AND date <= ?;