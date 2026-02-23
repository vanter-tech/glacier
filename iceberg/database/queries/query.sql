-- iceberg/database/query.sql

-- name: SetAppSetting :exec
INSERT OR REPLACE INTO app_settings (key, value)
VALUES (?, ?);

-- name: GetAppSetting :one
SELECT value FROM app_settings
WHERE key = ? LIMIT 1;

-- name: GetAllAccounts :many
SELECT * FROM accounts;