import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CurrencyPairsNames, CurrencyPairsRates, Product } from '@app/modules/cart/services/cart.service';
import { Currencies } from '@shared/helpers/app.constants';

@Component({
  selector: 'cc-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
  @Input() product: Product;
  @Input() currencyPairsRates: Record<CurrencyPairsRates, number>;
  @Input() activeCurrency: Currencies;

  currencyPairsNames = CurrencyPairsNames;
}
