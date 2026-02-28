package database

import (
	"context"
	"fmt"
	"glacier/iceberg/database/queries"
)

func ActivateProfile(profileType string) error {
	InitDB()

	err := Q.SetAppSetting(context.Background(), queries.SetAppSettingParams{
		Key:   "active_profile",
		Value: profileType,
	})

	if err != nil {
		return fmt.Errorf("failed to save active profile setting: %w", err)
	}

	return nil
}
