import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

export interface Product {
  uuid: string;
  price: number;
  name: string;
  image: string;
  createdAt: string;
}

export enum CurrencyPairsRates {
  USDRUB = 'rubles',
  USDEUR = 'euros',
  USDGBP = 'US dollars',
  USDJPY = 'yens',
}

@Injectable({ providedIn: 'root' })
export class CartService {
  constructor(private http: HttpClient) {}

  loadCurrencyPairsRates(pairs: string): Observable<Record<CurrencyPairsRates, number>> {
    return this.http
      .get<{ rates: Record<CurrencyPairsRates, number>; code: number }>('/api/live', {
        params: { pairs },
      })
      .pipe(pluck('rates'));
  }
}
