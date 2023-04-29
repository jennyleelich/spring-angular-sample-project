import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
    searchProducts: Product[ ] = [];
    constructor(private router: Router) {

    }

    doSearch(value: string) {
      this.router.navigateByUrl(`/search/${value}`);
     
    }

}
