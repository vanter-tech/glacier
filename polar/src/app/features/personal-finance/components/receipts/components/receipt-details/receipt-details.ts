import {Component, input} from '@angular/core';

@Component({
  selector: 'app-receipt-details',
  imports: [],
  templateUrl: './receipt-details.html',
  styleUrl: './receipt-details.scss',
})
export class ReceiptDetails {
  receipt = input.required<any>();
}
