import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { loadSelectedCart, setActiveCurrency, loadCurrencyPairsRates } from '@app/modules/cart/store/cart.actions';
import { CartState } from '@app/modules/cart/store/cart.reducer';
import { selectActiveCurrency, selectCurrencyPairsRates, selectProducts } from '@app/modules/cart/store/cart.selectors';
import { select, Store } from '@ngrx/store';
import { Currencies } from '@shared/helpers/app.constants';
import { CartService, CurrencyPairsRates } from '../../services/cart.service';

@Component({
  selector: 'cc-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit {
  currencies = Currencies;
  products$ = this.store$.pipe(select(selectProducts));
  activeCurrency$ = this.store$.pipe(select(selectActiveCurrency));
  currencyPairsRates$ = this.store$.pipe(select(selectCurrencyPairsRates));

  constructor(private store$: Store<CartState>, private cartService: CartService) {}

  ngOnInit(): void {
    this.store$.dispatch(loadSelectedCart({ data: [{ price: 20 }, { price: 45 }, { price: 67 }, { price: 1035 }] }));
    this.store$.dispatch(loadCurrencyPairsRates({ pairs: 'USDRUB,USDEUR,USDGBP,USDJPY' }));
  }

  setActiveCurrency(activeCurrency: Currencies): void {
    this.store$.dispatch(setActiveCurrency({ activeCurrency }));
  }
}
