import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';
import { Product } from '../common/product';

@Injectable({
	providedIn: 'root'
})
export class CartService {
	storage : Storage =  sessionStorage;
	cartItems: CartItem[] = [];
	totalPrice: Subject<number> = new Subject<number>();
	totalQuantity: Subject<number> = new Subject<number>();
	totalPriceValue: number = 0;
	totalQuantityValue: number = 0;
	constructor() { 
		let data = JSON.parse(this.storage.getItem('cartItems')!);
		if (data != null) {
			this.cartItems = data;
			this.computeCartTotals();
		}
	}
	persistCartItems() {
		this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
	}
	addToCart(theCartItem: CartItem) {
		let alreadyExistsInCart: boolean = false;
		let existingCartItem: CartItem | undefined;
		if (this.cartItems.length > 0) {
			existingCartItem = this.cartItems.find(item => item.id === theCartItem.id);
			alreadyExistsInCart = (existingCartItem !== undefined)
		}
		if (existingCartItem !== undefined) {
			existingCartItem.quantity++;
		} else {
			this.cartItems.push(theCartItem);
		}
		this.computeCartTotals();
	}

	computeCartTotals() {
		this.totalPriceValue = 0;
		this.totalQuantityValue = 0;
		for (let currentCartItem of this.cartItems) {
			this.totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
			this.totalQuantityValue += currentCartItem.quantity;
		}
		this.totalPrice.next(this.totalPriceValue);
		this.totalQuantity.next(this.totalQuantityValue);
		this.persistCartItems();
	}
}
