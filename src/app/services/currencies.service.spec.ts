import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Spy, createSpyFromClass } from 'jest-auto-spies';

import { Pairs, ResponsePairsRates } from './currencies.interface';
import { CurrenciesService } from './currencies.service';

describe('CurrenciesService', () => {
  let httpClient: Spy<HttpClient>;

  let service: CurrenciesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: createSpyFromClass(HttpClient, { methodsToSpyOn: ['get'] }) }],
    });

    httpClient = TestBed.inject<any>(HttpClient);
    service = TestBed.inject(CurrenciesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#loadCurrencyPairsRates should load currency pairs rates from API when data is not available in storage', (done) => {
    const mockData: ResponsePairsRates = {
      rates: { [Pairs.USD]: 1, [Pairs.EUR]: 0.85, [Pairs.GBP]: 0.75, [Pairs.RUB]: 75 },
      date: Date.now(),
      base: 'USD',
    };

    jest.spyOn(service as any, 'getFromStorage').mockReturnValue(null);
    httpClient.get.nextOneTimeWith(mockData);

    service.loadCurrencyPairsRates([Pairs.USD, Pairs.EUR, Pairs.GBP, Pairs.RUB]).subscribe((data) => {
      expect(data.rates).toEqual(mockData.rates);
      done();
    });
  });

  it('#loadCurrencyPairsRates should load currency pairs rates from storage when data is available and not expired', () => {
    const mockData: ResponsePairsRates = {
      rates: { [Pairs.USD]: 1, [Pairs.EUR]: 0.85, [Pairs.GBP]: 0.75, [Pairs.RUB]: 75 },
      date: Date.now(),
      base: 'USD',
    };

    jest.spyOn(service as any, 'getFromStorage').mockReturnValue(mockData);

    service.loadCurrencyPairsRates([Pairs.USD, Pairs.EUR, Pairs.GBP, Pairs.RUB]).subscribe((data) => {
      expect(data).toEqual(mockData);
    });
  });
});
