// Package summary is responsible for database operations involving UI summary.
package summary

import (
	"context"
	"fmt"
	"glacier/iceberg/database"
	"glacier/iceberg/database/queries"
	"time"
)

// GetTotalBalance retrieves the total balance across all accounts.
func GetTotalBalance() (int64, error) {
	total, err := database.Q.GetTotalBalance(context.Background())
	if err != nil {
		return 0, fmt.Errorf("failed to get total balance: %w", err)
	}

	return total, nil
}

// GetTotalSpent retrieves the total amount spent across all transactions.
func GetTotalSpent() (int64, error) {
	total, err := database.Q.GetTotalSpent(context.Background())
	if err != nil {
		return 0, fmt.Errorf("failed to get total spent: %w", err)
	}

	return total, nil
}

// GetTotalSpentByDateRange retrieves the total amount spent within a specific date range.
// It expects dates in "YYYY-MM-DD" format.
func GetTotalSpentByDateRange(startDate, endDate string) (int64, error) {
	_, err := time.Parse("2006-01-02", startDate)
	if err != nil {
		return 0, fmt.Errorf("invalid date format: %w", err)
	}

	_, err = time.Parse("2006-01-02", endDate)
	if err != nil {
		return 0, fmt.Errorf("invalid date format: %w", err)
	}

	total, err := database.Q.GetTotalSpentByDateRange(context.Background(), queries.GetTotalSpentByDateRangeParams{
		Date:   startDate,
		Date_2: endDate,
	})
	if err != nil {
		return 0, fmt.Errorf("failed to get total spend by date range: %s, %s: %w", startDate, endDate, err)
	}

	return total, nil
}
