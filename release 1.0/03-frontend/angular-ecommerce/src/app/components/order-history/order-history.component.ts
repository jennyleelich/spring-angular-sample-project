import { Component, OnInit } from '@angular/core';
import { OrderHistory } from 'src/app/common/order-history';
import { OrderHistoryService } from 'src/app/service/order-history.service';

@Component({
	selector: 'app-order-history',
	templateUrl: './order-history.component.html',
	styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
	orderHistoryList: OrderHistory[] = [];
	storage: Storage = sessionStorage;
	constructor(private orderHistorySvc: OrderHistoryService) {

	}

	ngOnInit(): void {
		this.handleOrderHistory();
	}
	handleOrderHistory() {
		const theEmail = JSON.parse(this.storage.getItem('userEmail')!);
		this.orderHistorySvc.getOrderHistory(theEmail).subscribe(data => {
			this.orderHistoryList = data._embedded.orders;
		})
	}
}
