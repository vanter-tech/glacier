package database

type Profile struct {
	FirstName string
	LastName  string
	ProfileId int
}

func NewProfile() *Profile {
	return &Profile{}
}

func (p *Profile) ActivateProfile(profileType string) error {
	InitDB()

	return nil
}
