import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Currencies } from '@shared/helpers/app.constants';

@Component({
  selector: 'cc-currency-button',
  templateUrl: './currency-button.component.html',
  styleUrls: ['./currency-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyButtonComponent {
  @Input() currency = Currencies.USD;
  @Input() isActive = false;
  @Output() setActiveCurrency = new EventEmitter<Currencies>();
}
