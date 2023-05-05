import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../common/order';
import { OrderHistory } from '../common/order-history';

@Injectable({
	providedIn: 'root'
})
export class OrderHistoryService {
	orderUrl = 'http://localhost:8080/api/orders';

	constructor(private http: HttpClient) { }

	getOrderHistory(theEmail: string): Observable<GetResponseOrderHistory> {
		const orderHistoryUrl = `${this.orderUrl}/search/findByCustomerEmail?email=${theEmail}`;
		return this.http.get<GetResponseOrderHistory>(orderHistoryUrl)
	}
}

interface GetResponseOrderHistory {
	_embedded : {
		orders: OrderHistory[];
	}
   }
