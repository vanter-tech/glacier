package receipts

import (
	"context"
	"database/sql"
	"fmt"
	"glacier/iceberg/database"
	"glacier/iceberg/database/queries"
	"time"
)

func CreateReceipt(amount float64, date string, description string) (queries.Receipt, error) {

	parsedDate, err := time.Parse("2006-01-02", date)
	if err != nil {
		return queries.Receipt{}, fmt.Errorf("invalid date format: %w", err)
	}

	if parsedDate.After(time.Now()) {
		return queries.Receipt{}, fmt.Errorf("receipt date cannot be in the future")
	}

	receipt, err := database.Q.CreateReceipt(context.Background(), queries.CreateReceiptParams{
		Amount: amount,
		Date:   date,
		Description: sql.NullString{
			String: description,
			Valid:  description != "",
		},
	})

	if err != nil {
		return queries.Receipt{}, fmt.Errorf("failed to insert receipt: %w", err)
	}

	return receipt, nil
}

func GetAllReceipts() ([]queries.Receipt, error) {
	receipts, err := database.Q.GetAllReceipts(context.Background())

	if err != nil {
		return nil, fmt.Errorf("failed to fetch receipts: %w", err)
	}

	return receipts, nil
}

func GetReceiptById(id int64) (queries.Receipt, error) {
	receipt, err := database.Q.GetReceiptById(context.Background(), id)

	if err != nil {
		return queries.Receipt{}, fmt.Errorf("failed to fetch receipt with id: %d: %w", id, err)
	}

	return receipt, nil
}

func DeleteReceiptById(id int64) error {
	err := database.Q.DeleteReceiptById(context.Background(), id)

	if err != nil {
		return fmt.Errorf("failed to delete receipt with id: %d: %w", id, err)
	}

	return nil
}
