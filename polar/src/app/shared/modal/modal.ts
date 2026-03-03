import {Component, input, output} from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal {
  title = input<string>('');
  onClose = output<void>();

  close() {
    this.onClose.emit();
  }
}
