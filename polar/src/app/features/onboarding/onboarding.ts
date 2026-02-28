import {Component, inject, output} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {Theme} from '../../core/theme';
import {ProfileType} from '../../app';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './onboarding.html',
  styleUrl: './onboarding.scss',
})
export class Onboarding {
  theme = inject(Theme)
  public ProfileType = ProfileType;

  profileSelected = output<ProfileType>();

  chooseProfile(type: ProfileType) {
    this.profileSelected.emit(type);
  }
}
