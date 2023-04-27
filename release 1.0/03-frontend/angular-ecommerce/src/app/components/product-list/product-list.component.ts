import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
    products: Product[] = [];
   constructor(private productService: ProductService) {

   }

   ngOnInit() {
    this.listProducts();
   }

   listProducts() {
    this.productService.getProductList().subscribe(res => {
        this.products = res;
    })
   }
}
