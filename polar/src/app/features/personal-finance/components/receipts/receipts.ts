import {Component, signal} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {Modal} from '../../../../shared/modal/modal';
import {ReceiptForm} from './components/receipt-form/receipt-form';
import {CreateReceipt} from '../../../../../../wailsjs/go/main/App';

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

  isModalOpen = signal(false);

  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  async saveReceipt(formData: any) {
    try {
      const newReceipt = await CreateReceipt(formData.amount, formData.date, formData.description || '');

      console.log("Succesfully saved to SQLite:", newReceipt);

      this.closeModal();
      console.log(this.isModalOpen)
    } catch (error) {
      console.error("Failed to save receipt:", error);
    }
  }
}
