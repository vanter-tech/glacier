import {Component, signal} from '@angular/core';
import {ActivateProfile} from "../../wailsjs/go/main/App";
import {Onboarding} from "./features/onboarding/onboarding"
import {TranslatePipe} from "@ngx-translate/core";
import {PersonalDashboard} from "./features/personal-finance/personal-dashboard/personal-dashboard";

@Component({
  selector: 'app-root',
  imports: [
    Onboarding,
    TranslatePipe,
    PersonalDashboard
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('polar');

  currentView: string = 'onboarding';
  errorMessage: string = '';

  selectProfile(profileType: string): void {
    ActivateProfile(profileType)
      .then(() => {
        console.log("Successfully activated profile:", profileType);
        this.currentView = profileType;
        this.errorMessage = '';
      })
      .catch((err) => {
        console.error("Database failed:", err);
        this.errorMessage = "Failed to load profile. Please try again.";
      });
  }
}
