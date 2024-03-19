import { Pipe, PipeTransform } from '@angular/core';

import { Pairs } from '../services/currencies.interface';

@Pipe({
  name: 'exclude',
  standalone: true,
})
export class ExcludePipe implements PipeTransform {
  transform(currencies: { name: string; code: Pairs }[] = [], code?: Pairs | string): { name: string; code: Pairs }[] {
    if (!currencies || !code) {
      return [];
    }

    return currencies.filter((item) => item.code !== code);
  }
}
