package account

import (
	"context"
	"fmt"
	"glacier/iceberg/database"
	"glacier/iceberg/database/queries"
)

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
