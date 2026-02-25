import {Component, signal} from '@angular/core';
import {ActivateProfile} from "../../wailsjs/go/main/App";
import {Onboarding} from "./onboarding/onboarding";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  imports: [
    Onboarding,
    TranslatePipe
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
