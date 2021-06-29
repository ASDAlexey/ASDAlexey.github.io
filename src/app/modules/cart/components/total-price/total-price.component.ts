import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CurrencyPairsNames, CurrencyPairsRates } from '@app/modules/cart/services/cart.service';
import { Currencies } from '@shared/helpers/app.constants';

@Component({
  selector: 'cc-total-price',
  templateUrl: './total-price.component.html',
  styleUrls: ['./total-price.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TotalPriceComponent {
  @Input() totalProductsPrice: number;
  @Input() currencyPairsRates: Record<CurrencyPairsRates, number>;
  @Input() activeCurrency: Currencies;

  currencyPairsNames = CurrencyPairsNames;
}
