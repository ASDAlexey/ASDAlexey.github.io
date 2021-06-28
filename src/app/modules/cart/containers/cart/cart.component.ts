import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CurrencyPairsNames } from '@app/modules/cart/services/cart.service';
import { loadCurrencyPairsRates, loadSelectedCart, setActiveCurrency } from '@app/modules/cart/store/cart.actions';
import { CartState } from '@app/modules/cart/store/cart.reducer';
import { selectActiveCurrency, selectCurrencyPairsRates, selectProducts } from '@app/modules/cart/store/cart.selectors';
import { select, Store } from '@ngrx/store';
import { Currencies } from '@shared/helpers/app.constants';

@Component({
  selector: 'cc-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit {
  currencyPairsNames = CurrencyPairsNames;
  currencies = Currencies;
  products$ = this.store$.pipe(select(selectProducts));
  activeCurrency$ = this.store$.pipe(select(selectActiveCurrency));
  currencyPairsRates$ = this.store$.pipe(select(selectCurrencyPairsRates));

  constructor(private store$: Store<CartState>) {}

  ngOnInit(): void {
    this.store$.dispatch(loadSelectedCart({ data: [{ price: 20 }, { price: 45 }, { price: 67 }, { price: 1035 }] }));
    this.store$.dispatch(loadCurrencyPairsRates({ pairs: ['RUB', 'EUR', 'GBP', 'JPY'] }));
  }

  setActiveCurrency(activeCurrency: Currencies): void {
    this.store$.dispatch(setActiveCurrency({ activeCurrency }));
  }
}
