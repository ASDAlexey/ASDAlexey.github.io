import { NgModule } from '@angular/core';
import { NgForTrackByKeyDirective } from './directives/track-by-key.directive';
import { CurrencySymbolPipe } from './pipes/currency-symbol.pipe';

const pipes = [CurrencySymbolPipe];
const directives = [NgForTrackByKeyDirective];

@NgModule({
  declarations: [...pipes, ...directives],
  imports: [],
  providers: [],
  exports: [...pipes, ...directives],
})
export class SharedModule {}
