package database

import (
	"database/sql"
	"log"
	"os"
	"path/filepath"

	_ "modernc.org/sqlite"
)

var DB *sql.DB

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

	createTables()
}

func createTables() {
	queries := []string{
		`CREATE TABLE IF NOT EXISTS accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    balance_cents INTEGER DEFAULT 0
    );`,
		`CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    is_tax_deductible BOOLEAN DEFAULT 0
                                      );`,
		`CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    amount_cents INTEGER NOT NULL,
    account_id INTEGER,
    category_id INTEGER,
    note TEXT,
    receipt_path TEXT,
    FOREIGN KEY(account_id) REFERENCES accounts(id),
    FOREIGN KEY(category_id) REFERENCES categories(id)
    );`,
	}

	for _, query := range queries {
		_, err := DB.Exec(query)
		if err != nil {
			log.Fatal("Failed to create table", err)
		}
	}
}
