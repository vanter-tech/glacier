export enum ProfileType {
  ONBOARDING = 'onboarding',
  PERSONAL = 'personal',
  STORE = 'store'
}

import {ChangeDetectorRef, Component, inject, signal} from '@angular/core';
import {ActivateProfile} from "../../wailsjs/go/main/App";
import {Onboarding} from "./features/onboarding/onboarding"
import {PersonalDashboard} from "./features/personal-finance/personal-dashboard/personal-dashboard";
import {StoreDashboard} from './features/store-owner/store-dashboard/store-dashboard';

@Component({
  selector: 'app-root',
  imports: [
    Onboarding,
    PersonalDashboard,
    StoreDashboard
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  public ProfileType = ProfileType;

  cdr = inject(ChangeDetectorRef);

  protected readonly title = signal('polar');

  currentView: ProfileType = ProfileType.ONBOARDING;

  errorMessage: string = '';

  async selectProfile(profileType: ProfileType) {
    try {
      await ActivateProfile(profileType);

      this.currentView = profileType;

      this.cdr.detectChanges();
    } catch (error) {
      console.error("Failed to activate profile:", error)
    }
  }
}
