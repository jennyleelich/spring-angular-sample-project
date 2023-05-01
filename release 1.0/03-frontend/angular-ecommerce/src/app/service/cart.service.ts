import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];
  constructor() { }
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();
  addToCart(theCartItem: CartItem) {
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined;
    if(this.cartItems.length > 0) {
       existingCartItem = this.cartItems.find(item => item.id === theCartItem.id);
       alreadyExistsInCart = (existingCartItem !== undefined)
  	}
	if(existingCartItem !== undefined) {
		existingCartItem.quantity++;
	} else {
		this.cartItems.push(theCartItem);
	}
	this.computeCartTotals();
}

	computeCartTotals() {
		let totalPriceValue: number = 0;
		let totalQuantityValue: number = 0;
		for(let currentCartItem of this.cartItems) {
			totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
			totalQuantityValue += currentCartItem.quantity;
		}
		this.totalPrice.next(totalPriceValue);
		this.totalQuantity.next(totalQuantityValue);
	}
}
