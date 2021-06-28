import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cc-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {}
