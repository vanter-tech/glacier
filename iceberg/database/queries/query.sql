-- iceberg/database/query.sql

-- name: SetAppSetting :exec
INSERT OR REPLACE INTO app_settings (key, value)
VALUES (?, ?);

-- name: GetAppSetting :one
SELECT value FROM app_settings
WHERE key = ? LIMIT 1;

-- name: GetAllAccounts :many
SELECT * FROM accounts;

-- name: CreateReceipt :one
INSERT INTO receipts (amount, date, description)
VALUES(?, ?, ?)
RETURNING *;

-- name: GetAllReceipts :many
SELECT * FROM receipts ORDER BY id DESC;

-- name: GetReceiptById :one
SELECT * FROM receipts WHERE id = ?;

-- name: DeleteReceiptById :exec
DELETE FROM receipts WHERE id = ?;