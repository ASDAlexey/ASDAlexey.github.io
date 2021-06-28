import { createAction, props } from '@ngrx/store';
import { Currencies } from '@shared/helpers/app.constants';
import { CurrencyPairsRates, Product } from '../services/cart.service';

export const loadSelectedCart = createAction('[Cart] Load Selected Cart', props<{ data: { price: number }[] }>());
export const loadSelectedCartSuccess = createAction(
  '[Cart] Load Selected Cart Success',
  props<{ products: Product[] }>(),
);
export const setActiveCurrency = createAction('[Cart] Set Active Currency', props<{ activeCurrency: Currencies }>());
export const loadCurrencyPairsRates = createAction('[Cart] Load Currency Pairs Rates', props<{ pairs: string[] }>());
export const loadCurrencyPairsRatesSuccess = createAction(
  '[Cart] Load Currency Pairs Rates Success',
  props<{ currencyPairsRates: Record<CurrencyPairsRates, number> }>(),
);
