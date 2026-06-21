import { TestBed } from '@angular/core/testing';
import { injectSpy, provideAutoSpy } from 'vitest-auto-spy';

import { App } from './app';
import { SeoService } from '@core/services/seo.service';
import { StructuredDataService } from '@core/services/structured-data.service';

describe('App', () => {
  it('initialises SEO and structured data once on creation (vitest-auto-spy)', () => {
    TestBed.configureTestingModule({
      providers: [provideAutoSpy(SeoService), provideAutoSpy(StructuredDataService)],
    });
    TestBed.overrideComponent(App, { set: { template: '', imports: [] } });

    TestBed.createComponent(App);

    expect(injectSpy(SeoService).init).toHaveBeenCalledTimes(1);
    expect(injectSpy(StructuredDataService).init).toHaveBeenCalledTimes(1);
  });
});
