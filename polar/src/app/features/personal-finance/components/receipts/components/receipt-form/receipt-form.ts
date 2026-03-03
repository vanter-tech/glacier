import {Component, output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-receipt-form',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule],
  templateUrl: './receipt-form.html',
  styleUrl: './receipt-form.scss',
})
export class ReceiptForm {
  onCancel = output<void>();

  onSave = output<any>();

  receiptForm = new FormGroup({
    amount: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    description: new FormControl('')
  });

  cancel() {
    this.onCancel.emit();
  }

  submit() {
    if (this.receiptForm.valid) {
      this.onSave.emit(this.receiptForm.value);
    }
  }
}
