import { Component, EventEmitter, Output } from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './onboarding.html',
  styleUrl: './onboarding.scss',
})
export class Onboarding {
  @Output() profileSelected = new EventEmitter<string>();

  chooseProfile(type: string) {
    this.profileSelected.emit(type);
  }
}
