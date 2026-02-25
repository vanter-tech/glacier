import {Component, EventEmitter, inject, Output} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {Theme} from '../../core/theme';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './onboarding.html',
  styleUrl: './onboarding.scss',
})
export class Onboarding {
  theme = inject(Theme)
  @Output() profileSelected = new EventEmitter<string>();

  chooseProfile(type: string) {
    this.profileSelected.emit(type);
  }
}
