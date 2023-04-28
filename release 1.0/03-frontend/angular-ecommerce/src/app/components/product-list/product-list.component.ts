import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
    products: Product[] = [];
    currentCategoryId: number = 1;
   constructor(private productService: ProductService, public route: ActivatedRoute) {

   }

   ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })
   }

   listProducts() {
    const hasId: boolean = this.route.snapshot.paramMap.has('id')
    if (hasId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      this.currentCategoryId = 1;
    }
    this.productService.getProductList(this.currentCategoryId).subscribe(res => {
        this.products = res;
    })
   }
}
