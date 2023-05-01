import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.scss']
})
export class CartStatusComponent implements OnInit{
	totalPrice: number =0;
	totalQuantity: number=0;
	constructor(private cartService: CartService){

	}
	ngOnInit() {
		this.cartService.totalPrice.subscribe(price => {
			this.totalPrice = price;
		})
		this.cartService.totalQuantity.subscribe(quantity => {
			this.totalQuantity = quantity;
		})
	}
}
