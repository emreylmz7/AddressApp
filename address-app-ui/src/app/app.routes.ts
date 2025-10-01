import { Routes } from '@angular/router';

import { AddressListComponent } from './components/address-list/address-list.component';

export const routes: Routes = [
  { path: '', component: AddressListComponent },
  { path: '**', redirectTo: '' }
];
