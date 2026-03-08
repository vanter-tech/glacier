-- iceberg/database/queries/query.sql

-- name: SetAppSetting :exec
INSERT OR
REPLACE INTO app_settings (key, value)
VALUES (?, ?);

-- name: GetAppSetting :one
SELECT value
FROM app_settings
WHERE key = ?
LIMIT 1;

-- name: CreateAccount :one
INSERT INTO accounts (name, type, balance_cents)
VALUES (?, ?, ?)
RETURNING *;

-- name: GetAllAccounts :many
SELECT *
FROM accounts;

-- name: CreateReceipt :one
INSERT INTO receipts (amount_cents, date, description)
VALUES (?, ?, ?)
RETURNING *;

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