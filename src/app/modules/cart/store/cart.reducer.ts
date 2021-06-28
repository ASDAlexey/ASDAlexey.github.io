import {
  loadCurrencyPairsRates,
  loadCurrencyPairsRatesSuccess,
  loadSelectedCartSuccess,
  setActiveCurrency,
} from '@app/modules/cart/store/cart.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Currencies } from '@shared/helpers/app.constants';
import { Status } from '@shared/helpers/async-item.helper';
import { CurrencyPairsRates, Product } from '../services/cart.service';

export interface CartState extends EntityState<Product> {
  activeCurrency: Currencies;
  currencyPairsRates: Record<CurrencyPairsRates, number>;
  statusCurrencyPairsRate: Status;
  error: string | null;
}

export function sortBy(a: Product, b: Product): number {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({
  selectId: (event: Product) => event.uuid,
  sortComparer: sortBy,
});

export const initialState: CartState = {
  activeCurrency: Currencies.USD,
  currencyPairsRates: {} as Record<CurrencyPairsRates, number>,
  statusCurrencyPairsRate: Status.UNINITIALIZED,
  error: null,
  ids: [],
  entities: {},
};

const cartReducer = createReducer(
  initialState,
  on(loadSelectedCartSuccess, (state, { products }) => {
    return adapter.addMany(products, state);
  }),
  on(setActiveCurrency, (state, { activeCurrency }) => ({ ...state, activeCurrency })),
  on(loadCurrencyPairsRates, state => ({ ...state, statusCurrencyPairsRate: Status.LOADING })),
  on(loadCurrencyPairsRatesSuccess, (state, { currencyPairsRates }) => ({
    ...state,
    currencyPairsRates,
    statusCurrencyPairsRate: Status.LOADED,
  })),
);

export function reducer(state: CartState | undefined, action: Action): CartState {
  return cartReducer(state, action);
}
