import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchase } from '../common/purchase';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private purchaseUrl = environment.jennyShopUrl + '/checkout/purchase';
  constructor(private http: HttpClient) { }
  placeOrder(purchase: Purchase): Observable<any> {
      return this.http.post<Purchase>(this.purchaseUrl, purchase);
  }
}
