import { ShoeShop } from './../_models/shoe-shop/ShoeShop';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetShoeInfoInput } from '../_models/shoe-info/GetShoeInfoInput';
import { HistoryShoePrice } from '../_models/shoe-info/HistoryShoePrice';
import { Shoes } from '../_models/shoe-info/shoes';
import { GetShoeReceiveDetailInput } from '../_models/shoe-receive/GetShoeReceiveDetailInput';

@Injectable({
  providedIn: 'root'
})
export class ShoeShopService {
  readonly APIUrl = 'http://localhost:60276';

  constructor(private http: HttpClient) { }

  getShoeShop(val: GetShoeInfoInput): Observable<any[]> {
    return this.http.post<any>(this.APIUrl + '/shop', val);
  }

  createShoeShop(val: ShoeShop) {
    return this.http.post(this.APIUrl + '/add-shop', val);
  }

  updateShoeShop(val: ShoeShop) {
    return this.http.post(this.APIUrl + '/update-shop', val);
  }

  // deleteShoesInfo(val: Shoes): Observable<any[]> {
  //   return this.http.post<any>(this.APIUrl + '/delete-shoes', val);
  // }

}
