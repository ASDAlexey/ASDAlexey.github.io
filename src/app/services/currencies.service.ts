import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Pairs, ResponsePairsRates } from './currencies.interface';

@Injectable({ providedIn: 'root' })
export class CurrenciesService {
  isLoaded$ = new BehaviorSubject(true);

  #currencyPairsRates: ResponsePairsRates | null = null;

  constructor(private http: HttpClient) {}

  loadCurrencyPairsRates(pairs: Pairs[]): Observable<ResponsePairsRates> {
    this.isLoaded$.next(true);
    const data = this.getFromStorage();

    if (data) {
      const diffInSec = (Date.now() - data.date) / 1000;

      return (diffInSec > 3600 ? this.loadCurrencyPairsRatesFromAPI(pairs) : of(data)).pipe(tap(() => this.isLoaded$.next(false)));
    } else {
      return this.loadCurrencyPairsRatesFromAPI(pairs).pipe(tap(() => this.isLoaded$.next(false)));
    }
  }

  setCurrencyPairsRates(data: ResponsePairsRates): void {
    this.#currencyPairsRates = data;
  }

  getAmount(amount: string, from: Pairs, to: Pairs): string {
    if (!this.#currencyPairsRates?.rates?.[from] || !this.#currencyPairsRates?.rates?.[to] || amount === '') {
      return '';
    }

    if (amount.match(',')) {
      amount = amount.replace(',', '.');
    }

    let res: string;

    if (from !== Pairs.USD) {
      const inDollars = +amount / this.#currencyPairsRates.rates[from];
      res = `${this.round(inDollars * this.#currencyPairsRates.rates[to]) || ''}`;
    } else {
      res = `${this.round(+amount * this.#currencyPairsRates.rates[to]) || ''}`;
    }

    return res.replace('.', ',');
  }

  private loadCurrencyPairsRatesFromAPI(pairs: Pairs[]): Observable<ResponsePairsRates> {
    return this.http.get<ResponsePairsRates>('latest', { params: { apikey: environment.CURRENCY_FREAKS_API_KEY } }).pipe(
      map((data) => {
        const rates = pairs.reduce((acc, pair) => ({ ...acc, [pair]: data.rates[pair] }), {} as Record<Pairs, number>);
        const currencyPairsRates = { ...data, rates, date: Date.now() };
        this.saveCurrencyPairsRatesToStorage(currencyPairsRates);
        return currencyPairsRates;
      }),
    );
  }

  private saveCurrencyPairsRatesToStorage(currencyPairsRates: ResponsePairsRates): void {
    localStorage.setItem('currencyPairsRates', JSON.stringify(currencyPairsRates));
  }

  private getFromStorage(): ResponsePairsRates | null {
    const currencyPairsRates = localStorage.getItem('currencyPairsRates');

    if (currencyPairsRates) {
      return JSON.parse(currencyPairsRates);
    } else {
      return null;
    }
  }

  private round(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
