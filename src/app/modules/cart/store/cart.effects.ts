import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { nanoid } from 'nanoid';
import { map, mergeMap } from 'rxjs/operators';
import { CartService, Product } from '../services/cart.service';
import {
  loadCurrencyPairsRates,
  loadCurrencyPairsRatesSuccess,
  loadSelectedCart,
  loadSelectedCartSuccess,
} from './cart.actions';

@Injectable()
export class CartEffects {
  loadSelectedCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSelectedCart),
      map(({ data }) =>
        loadSelectedCartSuccess({ products: data.map((item, index) => this.createProduct(item, index)) }),
      ),
    ),
  );

  loadCurrencyPairsRates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCurrencyPairsRates),
      mergeMap(({ pairs }) =>
        this.cartService
          .loadCurrencyPairsRates(pairs)
          .pipe(map(currencyPairsRates => loadCurrencyPairsRatesSuccess({ currencyPairsRates }))),
      ),
    ),
  );

  constructor(private actions$: Actions, private cartService: CartService) {}

  private createProduct(data: { price: number }, index: number): Product {
    return {
      ...data,
      uuid: nanoid(),
      name: 'Product name ' + (index + 1),
      image: 'https://picsum.photos/id/' + index * 10 + '/200/200',
      createdAt: new Date().toISOString(),
    };
  }
}
