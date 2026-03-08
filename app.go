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

func (b *App) shutdown(ctx context.Context) {
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

// CreateAccount creates an account with data sent from Polar
func (b *App) CreateAccount(name string, accType string, balance float64) (queries.Account, error) {
	return account.CreateAccount(name, accType, balance)
}

// GetAllAccounts retrieves a list of all accounts.
func (b *App) GetAllAccounts() ([]queries.Account, error) {
	return account.GetAllAccounts()
}

// ActivateProfile gets the user's profile from Polar
func (b *App) ActivateProfile(profileType string) error {
	return account.ActivateProfile(profileType)
}

// Receipts Bindings

// CreateReceipt creates a receipt with the form received from Polar
func (b *App) CreateReceipt(amount float64, date string, description string) (queries.Receipt, error) {
	return receipts.CreateReceipt(amount, date, description)
}

// GetAllReceipts gets all receipts
func (b *App) GetAllReceipts() ([]queries.Receipt, error) {
	return receipts.GetAllReceipts()
}

// GetReceiptById gets a receipt by ID
func (b *App) GetReceiptById(id int64) (queries.Receipt, error) {
	return receipts.GetReceiptById(id)
}

// DeleteReceipt deletes a receipt by ID
func (b *App) DeleteReceipt(id int64) error {
	return receipts.DeleteReceiptById(id)
}

// Summary Bindings

// GetTotalBalance gets the total balance based on account
func (b *App) GetTotalBalance() (int64, error) {
	return summary.GetTotalBalance()
}

// GetTotalSpent gets the total balance spent based on receipts
func (b *App) GetTotalSpent() (int64, error) {
	return summary.GetTotalSpent()
}

// GetTotalSpentByDateRange gets the total balance spent within a time frame
func (b *App) GetTotalSpentByDateRange(startDate string, endDate string) (int64, error) {
	return summary.GetTotalSpentByDateRange(startDate, endDate)
}
