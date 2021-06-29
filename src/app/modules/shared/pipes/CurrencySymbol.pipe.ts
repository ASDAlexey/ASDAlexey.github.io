import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'currencySymbol' })
export class CurrencySymbolPipe implements PipeTransform {
  transform(text: string | null): string {
    if (text === null) {
      return '';
    } else {
      return text ? text.replace(/([\d.])+/g, '') : text;
    }
  }
}
