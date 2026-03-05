import {Component, computed, signal} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {Modal} from '../../../../shared/modal/modal';
import {ReceiptForm} from './components/receipt-form/receipt-form';
import {CreateReceipt, GetAllReceipts, GetReceiptById} from '../../../../../../wailsjs/go/main/App';
import {ReceiptDetails} from './components/receipt-details/receipt-details';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-receipts',
  imports: [
    TranslatePipe,
    Modal,
    ReceiptForm,
    ReceiptDetails,
    NgOptimizedImage
  ],
  templateUrl: './receipts.html',
  styleUrl: './receipts.scss',
})
export class Receipts {
  readonly iconPath = '/favicon.ico';

  isModalOpen = signal(false);
  isDetailModalOpen = signal(false); // This will be used for viewing receipts, above modal is for the form

  receipts = signal<any[]>([]);
  selectedReceipt = signal<any>(null);

  currentPage = signal(1);
  pageSize = 10;

  // Modal Logic

  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.isDetailModalOpen.set(false);
    this.selectedReceipt.set(false);
  }

  // Receipt Logic

  async saveReceipt(formData: any) {
    try {
      await CreateReceipt(formData.amount, formData.date, formData.description || '');

      await this.loadReceipts();

      this.closeModal();
    } catch (error) {
      console.error("Failed to save receipt:", error);
    }
  }

  async loadReceipts() {
    try {
      const data = await GetAllReceipts(); // TODO I need to fix this later, right now I'm getting the entire database while calling this, change is not big.
      this.receipts.set(data || []);
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
  }

  async viewReceipt(id: number) {
    try {
      const data = await GetReceiptById(id);
      this.selectedReceipt.set(data);
      this.isDetailModalOpen.set(true);
    } catch (error) {
      console.error("Failed to fetch detail:", error);
    }
  }

  // Pagination Logic
  paginatedReceipts = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.receipts().slice(start, start + this.pageSize);
  });

  nextPage() {
    if (this.currentPage() * this.pageSize < this.receipts().length) {
      this.currentPage.update(p => p + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
    }
  }

  async ngOnInit() {
    await this.loadReceipts();
  }
}
