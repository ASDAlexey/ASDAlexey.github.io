import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, of } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';

export interface Product {
  uuid: string;
  price: number;
  name: string;
  image: string;
  createdAt: string;
}

export enum CurrencyPairsRates {
  USDRUB = 'USDRUB',
  USDEUR = 'USDEUR',
  USDGBP = 'USDGBP',
  USDJPY = 'USDJPY',
}

export const CurrencyPairsNames = {
  RUB: 'rubles',
  EUR: 'euros',
  GBP: 'pounds',
  JPY: 'yens',
  USD: 'US dollars',
};

@Injectable({ providedIn: 'root' })
export class CartService {
  constructor(private http: HttpClient) {}

  loadCurrencyPairsRates(pairs: string[]): Observable<Record<CurrencyPairsRates, number>> {
    const data = this.getCurrencyPairsRatesFromStorage();

    if (data) {
      const diffInSec = (Date.now() - data.date) / 1000;

      return diffInSec > 3600 ? this.loadCurrencyPairsRatesFromAPI(pairs) : of(data.currencyPairsRates);
    } else {
      return this.loadCurrencyPairsRatesFromAPI(pairs);
    }
  }

  private loadCurrencyPairsRatesFromAPI(pairs: string[]): Observable<Record<CurrencyPairsRates, number>> {
    return this.http
      .get<{ rates: Record<keyof CurrencyPairsRates, string>; date: string; base: 'USD' }>(`/latest`, {
        params: { apikey: environment.CURRENCY_FREAKS_API_KEY },
      })
      .pipe(
        pluck('rates'),
        map((rates: Record<string, string>) => {
          return pairs.reduce((acc, currency) => {
            return { ...acc, [`USD${currency}`]: +rates[currency] };
          }, {} as Record<CurrencyPairsRates, number>);
        }),
        tap(currencyPairsRates => this.saveCurrencyPairsRatesToStorage(currencyPairsRates)),
      );
  }

  private saveCurrencyPairsRatesToStorage(currencyPairsRates: Record<CurrencyPairsRates, number>) {
    localStorage.setItem('currencyPairsRates', JSON.stringify({ currencyPairsRates, date: Date.now() }));
  }

  private getCurrencyPairsRatesFromStorage(): {
    currencyPairsRates: Record<CurrencyPairsRates, number>;
    date: number;
  } | null {
    const currencyPairsRates = localStorage.getItem('currencyPairsRates');

    if (currencyPairsRates) {
      return JSON.parse(currencyPairsRates);
    } else {
      return null;
    }
  }
}
