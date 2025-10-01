import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Address, CreateAddressDto, UpdateAddressDto, BulkImportRequest, BulkImportResponse } from '../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/addresses`;

  addresses = signal<Address[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  getAddresses(): Observable<Address[]> {
    this.loading.set(true);
    this.error.set(null);

    return this.http.get<Address[]>(this.apiUrl).pipe(
      tap((addresses) => {
        this.addresses.set(addresses);
        this.loading.set(false);
      }),
      catchError((error) => this.handleError(error))
    );
  }

  createAddress(address: CreateAddressDto): Observable<Address> {
    this.loading.set(true);
    this.error.set(null);

    return this.http.post<Address>(this.apiUrl, address).pipe(
      tap((newAddress) => {
        this.addresses.update((addresses) => [...addresses, newAddress]);
        this.loading.set(false);
      }),
      catchError((error) => this.handleError(error))
    );
  }

  updateAddress(id: number, address: UpdateAddressDto): Observable<void> {
    this.loading.set(true);
    this.error.set(null);

    return this.http.put<void>(`${this.apiUrl}/${id}`, address).pipe(
      tap(() => {
        this.addresses.update((addresses) =>
          addresses.map((addr) => (addr.id === id ? { ...addr, ...address, id } : addr))
        );
        this.loading.set(false);
      }),
      catchError((error) => this.handleError(error))
    );
  }

  deleteAddress(id: number): Observable<void> {
    this.loading.set(true);
    this.error.set(null);

    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.addresses.update((addresses) =>
          addresses.filter((addr) => addr.id !== id)
        );
        this.loading.set(false);
      }),
      catchError((error) => this.handleError(error))
    );
  }

  bulkImport(rawAddressesText: string): Observable<BulkImportResponse> {
    this.loading.set(true);
    this.error.set(null);

    const rawAddresses = rawAddressesText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    return this.http.post<BulkImportResponse>(`${this.apiUrl}/bulk-import`, rawAddresses).pipe(
      tap(() => {
        // Refresh the list after bulk import
        this.getAddresses().subscribe();
      }),
      catchError((error) => this.handleError(error))
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    this.loading.set(false);

    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      errorMessage = `Server Error: ${error.status} - ${error.message}`;
    }

    this.error.set(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}

