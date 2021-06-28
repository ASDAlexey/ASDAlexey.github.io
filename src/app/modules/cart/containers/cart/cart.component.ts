import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Currencies } from '../../../shared/helpers/app.constants';
import { CartService } from '../../cart.service';

@Component({
  selector: 'cc-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  currencies = Currencies;
  activeCurrency = Currencies.USD;
  selectedCart = this.cartService.selectedCart;

  constructor(private cartService: CartService) {}

  setActiveCurrency(activeCurrency: Currencies): void {
    this.activeCurrency = activeCurrency;
  }
}
