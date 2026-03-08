package account

import (
	"context"
	"fmt"
	"glacier/iceberg/database"
	"glacier/iceberg/database/queries"
	"math"
)

func CreateAccount(name string, accType string, balance float64) (queries.Account, error) {
	balanceCents := int64(math.Round(balance * 100))
	account, err := database.Q.CreateAccount(context.Background(), queries.CreateAccountParams{
		Name:         name,
		Type:         accType,
		BalanceCents: balanceCents,
	})
	if err != nil {
		return queries.Account{}, fmt.Errorf("could not create account: %w", err)
	}

	return account, nil
}

func GetAllAccounts() ([]queries.Account, error) {
	accounts, err := database.Q.GetAllAccounts(context.Background())
	if err != nil {
		return []queries.Account{}, fmt.Errorf("failed to load accounts: %w", err)
	}

	return accounts, nil
}
