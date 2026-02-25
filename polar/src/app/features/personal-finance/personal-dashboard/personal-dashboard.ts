import {Component, inject} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {Summary} from "../components/summary/summary";
import {Receipts} from "../components/receipts/receipts";
import {DuePayments} from "../components/due-payments/due-payments";
import {CashFlow} from "../components/cash-flow/cash-flow";
import {Theme} from '../../../core/theme';

@Component({
  selector: 'app-personal-dashboard',
  standalone: true,
  imports: [TranslateModule, Summary, Receipts, DuePayments, CashFlow],
  templateUrl: './personal-dashboard.html',
  styleUrl: './personal-dashboard.scss',
})
export class PersonalDashboard {
  theme = inject(Theme)
  activeTab: 'summary' | 'receipts' | 'due-payments' | 'cash-flow' = 'summary';

  switchTab(tab: 'summary' | 'receipts' | 'due-payments' | 'cash-flow') {
    this.activeTab = tab;
  }
}
