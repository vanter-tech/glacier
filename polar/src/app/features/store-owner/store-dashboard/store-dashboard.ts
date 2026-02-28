import {Component, inject, output} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {Theme} from '../../../core/theme';
import {Summary} from '../components/summary/summary';
import {Sales} from '../components/sales/sales';
import {Inventory} from '../components/inventory/inventory';
import {Clients} from '../components/clients/clients';
import {CashFlow} from '../components/cash-flow/cash-flow';

@Component({
  selector: 'app-store-dashboard',
  imports: [TranslateModule, Summary, Sales, Inventory, Clients, CashFlow],
  templateUrl: './store-dashboard.html',
  styleUrl: './store-dashboard.scss',
})
export class StoreDashboard {
  theme = inject(Theme)
  onSwitchProfile = output<void>();

  activeTab: 'summary' | 'sales' | 'inventory' | 'clients' | 'cash-flow' = 'summary';

  switchTab(tab: 'summary' | 'sales' | 'inventory' | 'clients' | 'cash-flow') {
    this.activeTab = tab;
  }

  triggerProfileSwitch() {
    this.onSwitchProfile.emit();
  }
}
