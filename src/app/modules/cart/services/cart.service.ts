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

export enum CurrencyPairs {
  USDRUB = 'USDRUB',
  USDEUR = 'USDEUR',
  USDGBP = 'USDGBP',
  USDJPY = 'USDJPY',
}

@Injectable({ providedIn: 'root' })
export class CartService {
  constructor(private http: HttpClient) {}

  loadCurrencyPairsRates(): Observable<Record<CurrencyPairs, number>> {
    return this.http
      .get<{ rates: Record<CurrencyPairs, number>; code: number }>('/', {
        params: { pairs: 'USDRUB,USDEUR,USDGBP,USDJPY' },
      })
      .pipe(pluck('rates'));
  }
}
