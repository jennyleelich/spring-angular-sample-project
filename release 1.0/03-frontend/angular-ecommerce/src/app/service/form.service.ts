import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) { }

  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let data: number[] = [];
    for(let theMonth = startMonth; theMonth <=12; theMonth++) {
        data.push(theMonth);
    }
    return of(data); //wrap an object as an Observable
  }

  getCreditCardYears(): Observable<number[]> {
    let data: number[] = [];
    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;
    for(let theYear = startYear; theYear <= endYear; theYear++) {
        data.push(theYear);
    }
    return of(data); //wrap an object as an Observable
  }

  getCountries(): Observable<Country[]> {
    const url = environment.jennyShopUrl + '/countries';
    return this.http.get<GetResponseCountries>(url).pipe(
        map(response => response._embedded.countries)
    )
  }

  getStateByCountryCode(countryCode: string):Observable<State[]> {
    const url = environment.jennyShopUrl + '/states/search/findByCountryCode?code='+ countryCode;
    return this.http.get<GetResponseStates>(url).pipe(
        map(response => response._embedded.states)
    )
  }
}

interface GetResponseStates {
	_embedded : {
		states: State[];
	}
   }

interface GetResponseCountries {
    _embedded : {
        countries: Country[];
}
}
