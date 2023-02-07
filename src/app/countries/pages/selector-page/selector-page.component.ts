import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs';
import { Country } from '../../interfaces/country.interfaces';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.css']
})
export class SelectorPageComponent implements OnInit {

  miForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required]
  });

  regions: string[] = [];
  countries: Country[] = [];
  borders: string[] = [];

  loading: boolean = false;

  constructor(private fb: FormBuilder, private countryService: CountryService) { }

  ngOnInit(): void {
    this.regions = this.countryService.regions;
    this.miForm.get('region')?.valueChanges
      .pipe(
        tap(() => {
          this.miForm.get('country')?.reset('');
          this.loading = true;
        }),
        switchMap(region => this.countryService.searchByRegion(region))
      )
      .subscribe(countries => {
        this.countries = countries;
        this.loading = false;
      });

    this.miForm.get('country')?.valueChanges
      .pipe(
        tap(_ => {
          this.miForm.get('border')?.reset('');
          this.borders = [];
          this.loading = true;
        }),
        switchMap(code => this.countryService.searchByCode(code))
      )
      .subscribe(country => {
        this.borders = country?.borders || [];
        this.loading = false;
      }
      );
  }

  store() {
    console.log(this.miForm.value);
  }

}
