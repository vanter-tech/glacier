// Package main is the entry point of the application.
package main

import (
	"context"
	"fmt"
	"glacier/iceberg/database/account"
	"glacier/iceberg/database/queries"
	"glacier/iceberg/database/receipts"
	"glacier/iceberg/database/summary"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type App struct {
	ctx context.Context
}

func NewApp() *App {
	return &App{}
}

func (b *App) startup(ctx context.Context) {
	b.ctx = ctx
}

func (b *App) shutdown(_ context.Context) {
	// Perform your teardown here
}

func (b *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (b *App) ShowDialog() {
	_, err := runtime.MessageDialog(b.ctx, runtime.MessageDialogOptions{
		Type:    runtime.InfoDialog,
		Title:   "Native Dialog from Go",
		Message: "This is a Native Dialog send from Go.",
	})

	if err != nil {
		panic(err)
	}
}

// --- Database Bindings ---

// Account Bindings

func (b *App) CreateAccount(name, accType, bank string, balance float64) (queries.Account, error) {
	return account.CreateAccount(name, accType, bank, balance)
}

func (b *App) DeleteAccount(id int64) error {
	return account.DeleteAccount(id)
}

func (b *App) GetAllAccounts() ([]queries.Account, error) {
	return account.GetAllAccounts()
}

func (b *App) GetAccountByID(id int64) (queries.Account, error) {
	return account.GetAccountByID(id)
}

func (b *App) ActivateProfile(profileType string) error {
	return account.ActivateProfile(profileType)
}

// Receipts Bindings

func (b *App) CreateReceipt(accountID int64, amount float64, date, description, receiptType string) (queries.Receipt, error) {
	return receipts.CreateReceipt(accountID, amount, date, description, receiptType)
}

func (b *App) GetAllReceipts() ([]queries.Receipt, error) {
	return receipts.GetAllReceipts()
}

func (b *App) GetReceiptByID(id int64) (queries.Receipt, error) {
	return receipts.GetReceiptByID(id)
}

func (b *App) GetReceiptsByAccount(accountID int64) ([]queries.Receipt, error) {
	return receipts.GetReceiptsByAccount(accountID)
}

func (b *App) DeleteReceiptByID(id int64) error {
	return receipts.DeleteReceiptByID(id)
}

// Summary Bindings

func (b *App) GetTotalBalance() (int64, error) {
	return summary.GetTotalBalance()
}

func (b *App) GetTotalSpent() (int64, error) {
	return summary.GetTotalSpent()
}

func (b *App) GetTotalSpentByDateRange(startDate, endDate string) (int64, error) {
	return summary.GetTotalSpentByDateRange(startDate, endDate)
}
