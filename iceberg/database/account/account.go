package account

import (
	"context"
	"fmt"
	"glacier/iceberg/database"
	"glacier/iceberg/database/queries"
	"math"
)

func CreateAccount(name string, accType string, bank string, balance float64) (queries.Account, error) {
	balanceCents := int64(math.Round(balance * 100))
	account, err := database.Q.CreateAccount(context.Background(), queries.CreateAccountParams{
		Name:         name,
		Type:         accType,
		Bank:         bank,
		BalanceCents: balanceCents,
	})
	if err != nil {
		return queries.Account{}, fmt.Errorf("could not create account: %w", err)
	}

	return account, nil
}

func DeleteAccount(id int64) error {
	err := database.Q.DeleteAccount(context.Background(), id)
	if err != nil {
		return fmt.Errorf("failed to delete account with id: %d: %w", id, err)
	}

	return nil
}

func GetAllAccounts() ([]queries.Account, error) {
	accounts, err := database.Q.GetAllAccounts(context.Background())
	if err != nil {
		return []queries.Account{}, fmt.Errorf("failed to load accounts: %w", err)
	}

	return accounts, nil
}

func GetAccountById(id int64) (queries.Account, error) {
	account, err := database.Q.GetAccountById(context.Background(), id)
	if err != nil {
		return queries.Account{}, fmt.Errorf("could not find account with id: %d: %w", id, err)
	}

	return account, nil
}
