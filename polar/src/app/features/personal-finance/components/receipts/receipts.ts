import {Component} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {Modal} from '../../../../shared/modal/modal';
import {ReceiptForm} from './components/receipt-form/receipt-form';

@Component({
  selector: 'app-receipts',
  imports: [
    TranslatePipe,
    Modal,
    ReceiptForm
  ],
  templateUrl: './receipts.html',
  styleUrl: './receipts.scss',
})
export class Receipts {
  readonly iconPath = '/favicon.ico';

  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
