import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{
	product!: Product;
	constructor(public route: ActivatedRoute, private productService: ProductService, private cartService: CartService) {

	}

	ngOnInit(): void {
		this.route.paramMap.subscribe(( ) => {
			const theProductId: number = +this.route.snapshot.paramMap.get('id')!;
			this.productService.getProduct(theProductId).subscribe(data => {
				this.product = data;
			})
		})
	}
	addToCart() {
		const cartItem = new CartItem(this.product);
		this.cartService.addToCart(cartItem);
	}
}
