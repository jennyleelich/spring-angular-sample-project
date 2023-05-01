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
	previousCategoryId: number = 1;
    searchMode: boolean = false;
	thePageNumber: number = 1;
	thePageSize: number = 10;
	theTotalElements: number = 0;
   constructor(private productService: ProductService, public route: ActivatedRoute) {

   }

   ngOnInit() {
		this.route.paramMap.subscribe(() => {
		this.listProducts();
		})
   }

   listProducts() {
		this.searchMode = this.route.snapshot.paramMap.has('keyword');

		if (this.searchMode) {
			this.handleSearchProducts();
		} else {
			this.handleListProducts();
		}
   }

   handleSearchProducts() {
		const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;
		this.productService.searchProducts(this.thePageNumber-1, this.thePageSize,theKeyword).subscribe((res)=> {
			this.products = res._embedded.products;
			this.theTotalElements = res.page.totalElements;
		})
	}

	handleListProducts() {
		const hasId: boolean = this.route.snapshot.paramMap.has('id')
		if (hasId) {
		this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
		} else {
		this.currentCategoryId = 1;
		}

		if(this.previousCategoryId !== this.currentCategoryId) {
			this.thePageNumber = 1;
		}

		this.previousCategoryId = this.currentCategoryId;

		this.productService.getProductListPaginate(this.thePageNumber - 1, this.thePageSize, this.currentCategoryId).subscribe(res => {
			this.products = res._embedded.products;
			this.theTotalElements = res.page.totalElements;
		})
    
   }

   updatePageSize(pageSize: string) {
		this.thePageSize = +pageSize;
		this.thePageNumber = 1;
		this.listProducts();
   }
}
