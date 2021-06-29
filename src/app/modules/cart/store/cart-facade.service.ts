import { Injectable } from '@angular/core';
import { loadCurrencyPairsRates, loadSelectedCart, setActiveCurrency } from '@app/modules/cart/store/cart.actions';
import { CartState } from '@app/modules/cart/store/cart.reducer';
import {
  selectActiveCurrency,
  selectCurrencyPairsRates,
  selectProducts,
  selectTotalProductsPrice,
} from '@app/modules/cart/store/cart.selectors';
import { select, Store } from '@ngrx/store';
import { Currencies } from '@shared/helpers/app.constants';

@Injectable({ providedIn: 'root' })
export class CartFacadeService {
  products$ = this.store$.pipe(select(selectProducts));
  totalProductsPrice$ = this.store$.pipe(select(selectTotalProductsPrice));
  activeCurrency$ = this.store$.pipe(select(selectActiveCurrency));
  currencyPairsRates$ = this.store$.pipe(select(selectCurrencyPairsRates));

  constructor(private store$: Store<CartState>) {
    this.store$.dispatch(loadSelectedCart({ data: [{ price: 20 }, { price: 45 }, { price: 67 }, { price: 1035 }] }));
    this.store$.dispatch(loadCurrencyPairsRates({ pairs: ['RUB', 'EUR', 'GBP', 'JPY'] }));
  }

  setActiveCurrency(activeCurrency: Currencies): void {
    this.store$.dispatch(setActiveCurrency({ activeCurrency }));
  }
}
