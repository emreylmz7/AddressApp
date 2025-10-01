import { Component, Output, EventEmitter, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AddressService } from '../../services/address.service';

@Component({
  selector: 'app-bulk-import',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bulk-import.component.html',
  styleUrl: './bulk-import.component.scss'
})
export class BulkImportComponent {
  private readonly addressService = inject(AddressService);

  @Output() close = new EventEmitter<void>();
  @Output() success = new EventEmitter<void>();

  addressesText = signal<string>('');
  submitting = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  onTextChange(event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value;
    this.addressesText.set(value);
  }

  onSubmit(): void {
    const text = this.addressesText().trim();

    if (!text) {
      this.errorMessage.set('Please enter at least one address');
      return;
    }

    this.submitting.set(true);
    this.errorMessage.set(null);

    this.addressService.bulkImport(text).subscribe({
      next: (response) => {
        this.submitting.set(false);
        if (response.failedEntries && response.failedEntries.length > 0) {
          const failedCount = response.failedEntries.length;
          this.errorMessage.set(`${response.message}\n${failedCount} address(es) failed to import.`);
        } else {
          this.success.emit();
        }
      },
      error: (err) => {
        this.submitting.set(false);
        this.errorMessage.set(err.message ?? 'Failed to import addresses');
      }
    });
  }

  onClose(): void {
    this.close.emit();
  }
}

