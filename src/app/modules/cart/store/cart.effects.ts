import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { CartService } from '../services/cart.service';
import { loadCurrencyPairsRates, loadCurrencyPairsRatesSuccess } from './cart.actions';

@Injectable()
export class CartEffects {
  loadCurrencyPairsRates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCurrencyPairsRates),
      mergeMap(({ pairs }) =>
        this.cartService
          .loadCurrencyPairsRates()
          .pipe(map(currencyPairs => loadCurrencyPairsRatesSuccess({ currencyPairs }))),
      ),
    ),
  );

  constructor(private actions$: Actions, private cartService: CartService) {}
}
