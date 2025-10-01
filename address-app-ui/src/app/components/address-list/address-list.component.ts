import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AddressService } from '../../services/address.service';
import { Address } from '../../models/address.model';
import { AddressFormComponent } from '../address-form/address-form.component';
import { BulkImportComponent } from '../bulk-import/bulk-import.component';

@Component({
  selector: 'app-address-list',
  standalone: true,
  imports: [CommonModule, FormsModule, AddressFormComponent, BulkImportComponent],
  templateUrl: './address-list.component.html',
  styleUrl: './address-list.component.scss'
})
export class AddressListComponent implements OnInit {
  private readonly addressService = inject(AddressService);

  addresses = this.addressService.addresses;
  loading = this.addressService.loading;
  error = this.addressService.error;

  searchTerm = signal<string>('');
  showAddModal = signal<boolean>(false);
  showEditModal = signal<boolean>(false);
  showBulkImportModal = signal<boolean>(false);
  selectedAddress = signal<Address | null>(null);

  filteredAddresses = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const addresses = this.addresses();

    if (!term) {
      return addresses;
    }

    return addresses.filter((address) =>
      address.city.toLowerCase().includes(term) ||
      address.region.toLowerCase().includes(term) ||
      address.streetAddress.toLowerCase().includes(term) ||
      address.branchInfo.toLowerCase().includes(term)
    );
  });

  ngOnInit(): void {
    this.loadAddresses();
  }

  loadAddresses(): void {
    this.addressService.getAddresses().subscribe();
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
  }

  openAddModal(): void {
    this.showAddModal.set(true);
  }

  closeAddModal(): void {
    this.showAddModal.set(false);
  }

  openEditModal(address: Address): void {
    this.selectedAddress.set(address);
    this.showEditModal.set(true);
  }

  closeEditModal(): void {
    this.showEditModal.set(false);
    this.selectedAddress.set(null);
  }

  openBulkImportModal(): void {
    this.showBulkImportModal.set(true);
  }

  closeBulkImportModal(): void {
    this.showBulkImportModal.set(false);
  }

  deleteAddress(id: number): void {
    if (confirm('Are you sure you want to delete this address?')) {
      this.addressService.deleteAddress(id).subscribe({
        error: (err) => console.error('Delete failed:', err)
      });
    }
  }

  onAddSuccess(): void {
    this.closeAddModal();
  }

  onEditSuccess(): void {
    this.closeEditModal();
  }

  onBulkImportSuccess(): void {
    this.closeBulkImportModal();
  }
}

