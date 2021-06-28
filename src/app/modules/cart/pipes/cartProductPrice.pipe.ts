import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPairsRates } from '@app/modules/cart/services/cart.service';

@Pipe({ name: 'cartProductPrice' })
export class CartProductPricePipe implements PipeTransform {
  transform(priceInUSD: number, currencyPairsRates: Record<CurrencyPairsRates, number>): Record<string, number> {
    // TODO: better use RUB, ... instead rubles, but it task requirements
    /*return {
      RUB: currencyPairsRates[CurrencyPairsRates.USDRUB],
      EUR: currencyPairsRates[CurrencyPairsRates.USDEUR],
      USD: priceInUSD,
      GBP: currencyPairsRates[CurrencyPairsRates.USDGBP],
      JPY: currencyPairsRates[CurrencyPairsRates.USDJPY],
    };*/

    return {
      rubles: priceInUSD * currencyPairsRates[CurrencyPairsRates.USDRUB],
      euros: priceInUSD * currencyPairsRates[CurrencyPairsRates.USDEUR],
      'US dollars': priceInUSD,
      pounds: priceInUSD * currencyPairsRates[CurrencyPairsRates.USDGBP],
      yens: priceInUSD * currencyPairsRates[CurrencyPairsRates.USDJPY],
    };
  }
}
