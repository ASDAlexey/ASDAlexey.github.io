import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Currencies } from '@shared/helpers/app.constants';

@Component({
  selector: 'cc-currency-symbol',
  templateUrl: './currency-symbol.component.html',
  styleUrls: ['./currency-symbol.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencySymbolComponent {
  @Input() currencyType = Currencies.USD;
}
