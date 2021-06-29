import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CartEffects } from '@app/modules/cart/store/cart.effects';
import { reducer } from '@app/modules/cart/store/cart.reducer';
import { ReactiveComponentModule } from '@ngrx/component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { CartComponent } from './containers/cart/cart.component';
import { PriceInfoPipe } from './pipes/priceInfo.pipe';
import { CurrencySymbolComponent } from './components/currency-symbol/currency-symbol.component';
import { CurrencyButtonComponent } from './components/currency-button/currency-button.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('cart', reducer),
    EffectsModule.forFeature([CartEffects]),
    ReactiveComponentModule,
  ],
  declarations: [CartComponent, PriceInfoPipe, CurrencySymbolComponent, CurrencyButtonComponent],
  exports: [CartComponent],
})
export class CartModule {}
