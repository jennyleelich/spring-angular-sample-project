import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 

  private env = environment;

  constructor(private http: HttpClient) {


   }
  getProductList(currentCategoryId: number): Observable<Product[]> {
	const searchUrl = this.env.jennyShopUrl + `/products/search/findByCategoryId?id=${currentCategoryId}`
	return this.getProducts(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
	const url = this.env.jennyShopUrl + `/product-category`
	return this.http.get<GetResponseProductCategory>(url) .pipe(
	map(response => response._embedded.productCategory)
  )
  }
  searchProducts(thePage:number, thePageSize:number, searchName: string): Observable<GetResponseProducts> {
	const searchUrl = this.env.jennyShopUrl + `/products/search/findByNameContaining?name=${searchName}`
	                   + `&page=${thePage}&size=${thePageSize}`
	return this.http.get<GetResponseProducts>(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
	return this.http.get<GetResponseProducts>(searchUrl) .pipe(
	map(response => response._embedded.products)
  )
  }

  public getProduct(productId: number): Observable<Product> {
	const url = this.env.jennyShopUrl + `/products/${productId}`
	return this.http.get<Product>(url)
  }

  public getProductListPaginate(thePage:number, thePageSize:number, theCategoryId: number): Observable<GetResponseProducts> {
	const searchUrl = this.env.jennyShopUrl + `/products/search/findByCategoryId?id=${theCategoryId}`
	                   + `&page=${thePage}&size=${thePageSize}`
	return this.http.get<GetResponseProducts>(searchUrl)
  }
}

interface GetResponseProducts {
 _embedded : {
	 products: Product[];
 },
 page: {
	size: number,
	totalElements: number,
	totalPages: number,
	number: number
 }
}

interface GetResponseProductCategory {
	_embedded : {
		productCategory: ProductCategory[];
	}
   }
