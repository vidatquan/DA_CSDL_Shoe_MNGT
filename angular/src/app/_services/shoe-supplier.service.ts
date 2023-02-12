import { ShoeSupplier } from './../_models/shoe-supplier/shoe-supplier';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetCusInputDto } from '../_models/get-cus-input-dto';

@Injectable({
  providedIn: 'root'
})
export class ShoeSupplierService {
  readonly APIUrl = 'http://localhost:60276';

  constructor(private http: HttpClient) {}

  getCustomers(val: GetCusInputDto): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/supplier', val);
  }

  updateCustomer(val: ShoeSupplier) {
    return this.http.post(this.APIUrl + '/update-supplier', val);
  }

  deleteCustomer(val: ShoeSupplier): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/delete-supplier', val);
  }

  registerCustomer(val: ShoeSupplier) {
    return this.http.post(this.APIUrl + '/add-supplier', val);
  }
}
