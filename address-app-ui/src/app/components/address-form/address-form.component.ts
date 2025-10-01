import { Component, Input, Output, EventEmitter, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AddressService } from '../../services/address.service';
import { Address, CreateAddressDto, UpdateAddressDto } from '../../models/address.model';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss'
})
export class AddressFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly addressService = inject(AddressService);

  @Input() mode: 'create' | 'edit' = 'create';
  @Input() address?: Address | null;
  @Output() close = new EventEmitter<void>();
  @Output() success = new EventEmitter<void>();

  addressForm!: FormGroup;
  submitting = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.addressForm = this.fb.group({
      region: [this.address?.region ?? '', [Validators.required, Validators.minLength(2)]],
      city: [this.address?.city ?? '', [Validators.required, Validators.minLength(2)]],
      branchInfo: [this.address?.branchInfo ?? '', [Validators.required, Validators.minLength(2)]],
      streetAddress: [this.address?.streetAddress ?? '', [Validators.required, Validators.minLength(3)]],
      phone: [this.address?.phone ?? '', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]],
      workingHours: [this.address?.workingHours ?? '', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.addressForm.invalid) {
      this.addressForm.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.errorMessage.set(null);

    const formValue = this.addressForm.value;

    if (this.mode === 'create') {
      this.createAddress(formValue);
    } else {
      this.updateAddress(formValue);
    }
  }

  private createAddress(data: CreateAddressDto): void {
    this.addressService.createAddress(data).subscribe({
      next: () => {
        this.submitting.set(false);
        this.success.emit();
      },
      error: (err) => {
        this.submitting.set(false);
        this.errorMessage.set(err.message ?? 'Failed to create address');
      }
    });
  }

  private updateAddress(data: UpdateAddressDto): void {
    if (!this.address?.id) {
      return;
    }

    const updateData: UpdateAddressDto = {
      ...data,
      id: this.address.id
    };

    this.addressService.updateAddress(this.address.id, updateData).subscribe({
      next: () => {
        this.submitting.set(false);
        this.success.emit();
      },
      error: (err) => {
        this.submitting.set(false);
        this.errorMessage.set(err.message ?? 'Failed to update address');
      }
    });
  }

  onClose(): void {
    this.close.emit();
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.addressForm.get(fieldName);
    return !!(field?.invalid && (field?.touched || field?.dirty));
  }

  getErrorMessage(fieldName: string): string {
    const field = this.addressForm.get(fieldName);

    if (!field?.errors) {
      return '';
    }

    if (field.errors['required']) {
      return 'This field is required';
    }

    if (field.errors['minlength']) {
      return `Minimum length is ${field.errors['minlength'].requiredLength}`;
    }

    if (field.errors['pattern']) {
      return 'Invalid phone number format';
    }

    return 'Invalid value';
  }
}

