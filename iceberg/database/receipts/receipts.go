// Package receipts handles all database logic regarding receipts created in Polar UI.
package receipts

import (
	"context"
	"database/sql"
	"fmt"
	"glacier/iceberg/database"
	"glacier/iceberg/database/queries"
	"math"
	"time"
)

// CreateReceipt creates a new receipt and updates the account balance.
func CreateReceipt(accountID int64, amount float64, date, description, receiptType string) (queries.Receipt, error) {

	parsedDate, err := time.Parse("2006-01-02", date)
	if err != nil {
		return queries.Receipt{}, fmt.Errorf("invalid date format: %w", err)
	}

	if parsedDate.After(time.Now()) {
		return queries.Receipt{}, fmt.Errorf("receipt date cannot be in the future")
	}

	amountCents := int64(math.Round(amount * 100))

	balanceChange := amountCents
	if receiptType == "expense" {
		balanceChange = -amountCents
	}

	ctx := context.Background()

	tx, err := database.DB.BeginTx(ctx, nil)
	if err != nil {
		return queries.Receipt{}, fmt.Errorf("could not being transaction: %w", err)
	}

	defer func(tx *sql.Tx) {
		err = tx.Rollback()
		if err != nil {
			return
		}
	}(tx)

	qtx := database.Q.WithTx(tx)

	receipt, err := qtx.CreateReceipt(ctx, queries.CreateReceiptParams{
		AccountID:   accountID,
		AmountCents: amountCents,
		Date:        date,
		Description: sql.NullString{
			String: description,
			Valid:  description != "",
		},
		Type: receiptType,
	})

	if err != nil {
		return queries.Receipt{}, fmt.Errorf("failed to insert receipt: %w", err)
	}

	err = qtx.UpdateAccountBalance(ctx, queries.UpdateAccountBalanceParams{
		BalanceCents: balanceChange,
		ID:           accountID,
	})

	if err != nil {
		return queries.Receipt{}, fmt.Errorf("failed to update account balance: %w", err)
	}

	if err := tx.Commit(); err != nil {
		return queries.Receipt{}, err
	}

	return receipt, nil
}

// GetAllReceipts retrieves all receipts from the database.
func GetAllReceipts() ([]queries.Receipt, error) {
	receipts, err := database.Q.GetAllReceipts(context.Background())

	if err != nil {
		return nil, fmt.Errorf("failed to fetch receipts: %w", err)
	}

	return receipts, nil
}

// GetReceiptByID retrieves a single receipt by its ID.
func GetReceiptByID(id int64) (queries.Receipt, error) {
	receipt, err := database.Q.GetReceiptById(context.Background(), id)
	if err != nil {
		return queries.Receipt{}, fmt.Errorf("failed to fetch receipt with id: %d: %w", id, err)
	}

	return receipt, nil
}

// GetReceiptsByAccount retrieves all receipts based on an account ID
func GetReceiptsByAccount(accountID int64) ([]queries.Receipt, error) {
	receipts, err := database.Q.GetReceiptsByAccount(context.Background(), accountID)
	if err != nil {
		return []queries.Receipt{}, fmt.Errorf("could not get receipts from account id: %d: %w", accountID, err)
	}

	return receipts, nil
}

// DeleteReceiptByID deletes a receipt based on its ID
func DeleteReceiptByID(id int64) error {
	err := database.Q.DeleteReceiptById(context.Background(), id)

	if err != nil {
		return fmt.Errorf("failed to delete receipt with id: %d: %w", id, err)
	}

	return nil
}
