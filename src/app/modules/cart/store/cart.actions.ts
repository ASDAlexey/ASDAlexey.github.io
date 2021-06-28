import { createAction, props } from '@ngrx/store';
import { CurrencyPairs } from '../services/cart.service';

export const loadSelectedCart = createAction(
  '[Cart] Load Selected Cart',
  props<{ data: { price: number }[] }>(),
);

export const loadCurrencyPairsRates = createAction(
  '[Cart] Load Currency Pairs Rates',
  props<{ pairs: CurrencyPairs[] }>(),
);

export const loadCurrencyPairsRatesSuccess = createAction(
  '[Cart] Load Currency Pairs Rates Success',
  props<{ currencyPairs: Record<CurrencyPairs, number> }>(),
);
