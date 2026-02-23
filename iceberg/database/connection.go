package database

import (
	"database/sql"
	"glacier/iceberg/database/queries"
	"log"
	"os"
	"path/filepath"

	_ "modernc.org/sqlite"
)

var DB *sql.DB

var Q *queries.Queries

func InitDB() {
	home, err := os.UserHomeDir()
	if err != nil {
		log.Fatal("Could not find home directory:", err)
	}

	appDir := filepath.Join(home, ".glacier")
	if _, err := os.Stat(appDir); os.IsNotExist(err) {
		err := os.MkdirAll(appDir, 0755)
		if err != nil {
			log.Fatal("Could not create glacier directory")
		}
	}

	dbPath := filepath.Join(appDir, "seal.db")

	DB, err = sql.Open("sqlite", dbPath)
	if err != nil {
		log.Fatal("Could not open database:", err)
	}

	Q = queries.New(DB)

	createBaseTables()
}

func createBaseTables() {
	query := `CREATE TABLE IF NOT EXISTS app_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
                                        );`

	_, err := DB.Exec(query)
	if err != nil {
		log.Fatal("Failed to create base settings table", err)
	}
}

func CreatePersonalSchema() error {
	queries := []string{
		`CREATE TABLE IF NOT EXISTS accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    balance_cents INTEGER DEFAULT 0
    );`,
		`CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    amount_cents INTEGER NOT NULL,
    account_id INTEGER,
    category TEXT,
    note TEXT,
    receipt_path TEXT,
    FOREIGN KEY(account_id) REFERENCES accounts(id)
    );`,
	}

	for _, query := range queries {
		_, err := DB.Exec(query)
		if err != nil {
			log.Println("Failed to create table", err)
			return err
		}
	}

	return nil
}

func CreateStoreSchema() error {
	queries := []string{
		`CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    price_cents INTEGER NOT NULL,
    stock INTEGER DEFAULT 0,
    category TEXT,
    image_path TEXT
                                    );`,
		`CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT,
    credit_balance_cents INTEGER DEFAULT 0
                                   );`,
		`CREATE TABLE IF NOT EXISTS store_sales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    client_id INTEGER,
    total_cents INTEGER NOT NULL,
    is_credit BOOLEAN DEFAULT 0,
    FOREIGN KEY(client_id) REFERENCES clients(id)
                                       );`,
	}

	for _, query := range queries {
		_, err := DB.Exec(query)
		if err != nil {
			log.Println("failed to execute queries: ", err)
			return err
		}
	}
	return nil
}
