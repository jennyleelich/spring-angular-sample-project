import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 

  private baseUrl = "http://localhost:8080/api/products?size=100"

  constructor(private http: HttpClient) {

   }
  getProductList(currentCategoryId: number): Observable<Product[]> {
	const searchUrl = `http://localhost:8080/api/products/search/findByCategoryId?id=${currentCategoryId}`
	return this.getProducts(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
	const url = `http://localhost:8080/api/product-category`
	return this.http.get<GetResponseProductCategory>(url) .pipe(
	map(response => response._embedded.productCategory)
  )
  }
  searchProducts(searchName: string): Observable<Product[]> {
	const searchUrl = `http://localhost:8080/api/products/search/findByNameContaining?name=${searchName}`
	return this.getProducts(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
	return this.http.get<GetResponseProducts>(searchUrl) .pipe(
	map(response => response._embedded.products)
  )
  }
}

interface GetResponseProducts {
 _embedded : {
	 products: Product[];
 }
}

interface GetResponseProductCategory {
	_embedded : {
		productCategory: ProductCategory[];
	}
   }
