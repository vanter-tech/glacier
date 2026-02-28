package database

import (
	"context"
	"database/sql"
	_ "embed"
	"glacier/iceberg/database/queries"
	"log"
	"os"
	"path/filepath"

	_ "modernc.org/sqlite"
)

//go:embed queries/schema.sql
var schemaSQL string

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

	_, err = DB.ExecContext(context.Background(), schemaSQL)
	if err != nil {
		log.Fatal("Failed to create database schema:", err)
	}

	Q = queries.New(DB)
}
