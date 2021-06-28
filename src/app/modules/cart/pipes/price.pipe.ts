import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPairsRates } from '@app/modules/cart/services/cart.service';

@Pipe({ name: 'price' })
export class PricePipe implements PipeTransform {
  transform(
    priceInUSD: number,
    currencyPairsRates: Record<CurrencyPairsRates, number>,
  ): {
    rubles: number;
    euros: number;
    'US dollars': number;
    pounds: number;
    yens: number;
  } {
    /*return {
      RUB: currencyPairsRates[CurrencyPairsRates.USDRUB],
      EUR: currencyPairsRates[CurrencyPairsRates.USDEUR],
      USD: priceInUSD,
      GBP: currencyPairsRates[CurrencyPairsRates.USDGBP],
      JPY: currencyPairsRates[CurrencyPairsRates.USDJPY],
    };*/

    console.log(currencyPairsRates)

    return {
      rubles: currencyPairsRates[CurrencyPairsRates.USDRUB],
      euros: currencyPairsRates[CurrencyPairsRates.USDEUR],
      'US dollars': priceInUSD,
      pounds: currencyPairsRates[CurrencyPairsRates.USDGBP],
      yens: currencyPairsRates[CurrencyPairsRates.USDJPY],
    };
  }
}
