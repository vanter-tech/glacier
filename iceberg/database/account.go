package database

import "log"

type Account struct {
	ID           int    `json:"id"`
	Name         string `json:"name"`
	Type         string `json:"type"`
	BalanceCents int    `json:"balance_cents"`
}

func GetAllAccounts() []Account {
	rows, err := DB.Query("SELECT id, name, type, balance_cents FROM accounts")
	if err != nil {
		log.Println("Error querying accounts:", err)
		return nil
	}
	defer rows.Close()

	var accounts []Account

	for rows.Next() {
		var acc Account
		err := rows.Scan(&acc.ID, &acc.Name, &acc.Type, &acc.BalanceCents)
		if err != nil {
			log.Println("Error scanning account row:", err)
			continue
		}
		accounts = append(accounts, acc)
	}

	return accounts
}
