import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CurrencyPairsNames } from '@app/modules/cart/services/cart.service';
import { CartFacadeService } from '@app/modules/cart/store/cart-facade.service';
import { Currencies } from '@shared/helpers/app.constants';

@Component({
  selector: 'cc-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  currencyPairsNames = CurrencyPairsNames;
  currencies = Currencies;

  products$ = this.cartFacade.products$;
  totalProductsPrice$ = this.cartFacade.totalProductsPrice$;
  activeCurrency$ = this.cartFacade.activeCurrency$;
  currencyPairsRates$ = this.cartFacade.currencyPairsRates$;

  constructor(private cartFacade: CartFacadeService) {}

  setActiveCurrency(activeCurrency: Currencies): void {
    this.cartFacade.setActiveCurrency(activeCurrency);
  }
}
