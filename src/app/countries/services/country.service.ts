import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private _regions: string[] = ["Africa", "Americas", "Asia", "Europe", "Oceania"]

  private urlBase: string = "https://restcountries.com/v3.1";

  get regions() {
    return [...this._regions];
  }
  constructor(private http: HttpClient) { }

  searchByRegion(region: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.urlBase}/region/${region}?fields=cca2,name,borders`);
  }

  searchByCode(code: string): Observable<Country | null> {

    if (!code) return of(null);

    return this.http.get<Country>(`${this.urlBase}/alpha/${code}?fields=cca2,name,borders`);
  }
}
