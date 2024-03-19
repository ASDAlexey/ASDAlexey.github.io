import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SvgIconComponent } from './svg-icon.component';
import { SvgIconService } from './svg-icon.service';

/**
 * Представляет модуль для импорта и экспорта SVG-иконок.
 *
 * @module SvgIconModule
 * @use CommonModule
 * @declaration SvgIconComponent
 * @export SvgIconComponent
 * @provider SvgIconService
 */
@NgModule({
  imports: [CommonModule],
  declarations: [SvgIconComponent],
  exports: [SvgIconComponent],
  providers: [SvgIconService],
})
export class SvgIconModule {}
