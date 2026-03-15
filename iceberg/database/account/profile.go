// Package account handles database operations for user financial accounts.
package account

import (
	"context"
	"fmt"
	"glacier/iceberg/database"
	"glacier/iceberg/database/queries"
)

// ActivateProfile activates a profile based on what user picks in Polar UI.
func ActivateProfile(profileType string) error {
	database.InitDB()

	err := database.Q.SetAppSetting(context.Background(), queries.SetAppSettingParams{
		Key:   "active_profile",
		Value: profileType,
	})

	if err != nil {
		return fmt.Errorf("failed to save active profile setting: %w", err)
	}

	return nil
}
