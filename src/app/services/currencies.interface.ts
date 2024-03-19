export enum Pairs {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  RUB = 'RUB',
}

export interface ResponsePairsRates {
  rates: Record<Pairs, number>;
  date: number;
  base: 'USD';
}
