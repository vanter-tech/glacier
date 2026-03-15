package main

import (
	"context"
	"fmt"
	"glacier/iceberg/database"
	"glacier/iceberg/database/queries"
	"glacier/iceberg/receipts"

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

// GetAccounts retrieves a list of all accounts.
func (b *App) GetAccounts() []queries.Account {
	accounts, err := database.Q.GetAllAccounts(context.Background())

	if err != nil {
		fmt.Println("Error fetching accounts from sqlc:", err)
		return nil
	}

	return accounts
}

// ActivateProfile gets the user's profile from Polar
func (b *App) ActivateProfile(profileType string) error {
	return database.ActivateProfile(profileType)
}

// CreateReceipt creates a receipt with the form received from Angular
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
