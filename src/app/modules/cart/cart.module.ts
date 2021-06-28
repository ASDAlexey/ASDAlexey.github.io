import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CartComponent } from './containers/cart/cart.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [CartComponent],
  exports: [CartComponent],
})
export class CartModule {}
