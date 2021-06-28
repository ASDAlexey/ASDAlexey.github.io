import { NgModule } from '@angular/core';
import { NgForTrackByKeyDirective } from './directives/track-by-key.directive';
import { ReplacePipe } from './pipes/replace.pipe';

const pipes = [ReplacePipe];
const directives = [NgForTrackByKeyDirective];

@NgModule({
  declarations: [...pipes, ...directives],
  imports: [],
  providers: [],
  exports: [...pipes, ...directives],
})
export class SharedModule {}
