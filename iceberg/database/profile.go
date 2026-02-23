package database

import (
	"context"
	"fmt"
	"glacier/iceberg/database/queries"
	"log"
)

func ActivateProfile(profileType string) error {
	err := Q.SetAppSetting(context.Background(), queries.SetAppSettingParams{
		Key:   "active_profile",
		Value: profileType,
	})
	if err != nil {
		return fmt.Errorf("could not set active profile: %v", err)
	}

	if profileType == "personal" {
		err = CreatePersonalSchema()
	} else if profileType == "store" {
		err = CreateStoreSchema()
	} else {
		return fmt.Errorf("invalid profile type: %s", profileType)
	}

	if err != nil {
		return fmt.Errorf("failed to initialize %s profile: %v", profileType, err)
	}

	settingKey := fmt.Sprintf("has_%s_profile", profileType)

	err = Q.SetAppSetting(context.Background(), queries.SetAppSettingParams{
		Key:   settingKey,
		Value: "true",
	})

	if err != nil {
		log.Println("Could not save profile creation status:", err)
	}

	return nil
}
