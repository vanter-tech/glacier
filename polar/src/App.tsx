import { useState } from 'react';
import {ProfileType} from "./core/type.ts";
import { ActivateProfile } from './wailsjs/go/main/App';

import PersonalDashboard from './features/personal-finance/PersonalDashboard';
import Onboarding from './features/onboarding/Onboarding';
import StoreDashboard from './features/store-owner/StoreDashboard';

export default function App() {
    const [currentView, setCurrentView] = useState<ProfileType>(ProfileType.ONBOARDING);

    const selectProfile = async (profileType: ProfileType) => {
        try {
            await ActivateProfile(profileType);

            setCurrentView(profileType);
        } catch (error) {
            console.error("Failed to activate profile:", error);
        }
    };

    const views = {
        [ProfileType.ONBOARDING]: <Onboarding onProfileSelected={selectProfile} />,
        [ProfileType.PERSONAL]: <PersonalDashboard onSwitchProfile={() => setCurrentView(ProfileType.ONBOARDING)} />,
        [ProfileType.STORE]: <StoreDashboard onSwitchProfile={() => setCurrentView(ProfileType.ONBOARDING)} />
    };

    return (
        <div className="min-h-screen bg-isabelline text-smoky dark:bg-gh-bg dark:text-gh-text transition-colors duration-500">
            {views[currentView]}
        </div>
    );
}