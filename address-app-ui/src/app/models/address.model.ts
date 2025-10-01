export interface Address {
  id: number;
  region: string;
  city: string;
  branchInfo: string;
  streetAddress: string;
  phone: string;
  workingHours: string;
}

export interface CreateAddressDto {
  region: string;
  city: string;
  branchInfo: string;
  streetAddress: string;
  phone: string;
  workingHours: string;
}

export interface UpdateAddressDto extends CreateAddressDto {
  id: number;
}

export interface BulkImportRequest {
  rawAddresses: string[];
}

export interface BulkImportResponse {
  message: string;
  failedEntries?: string[];
}

