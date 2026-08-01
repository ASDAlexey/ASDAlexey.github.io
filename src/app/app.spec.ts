import { TestBed } from '@angular/core/testing';
import { injectSpy, provideAutoSpy } from 'vitest-auto-spy/angular';

import { App } from './app';
import { SeoService } from '@core/services/seo.service';
import { StructuredDataService } from '@core/services/structured-data.service';

describe('App', () => {
  // Constructed rather than rendered: the whole class is two service calls, and the template
  // now holds a `@defer` block — overriding it would force TestBed into async compilation for
  // markup this test never looks at.
  it('initialises SEO and structured data once on creation (vitest-auto-spy)', () => {
    TestBed.configureTestingModule({
      providers: [provideAutoSpy(SeoService), provideAutoSpy(StructuredDataService)],
    });

    TestBed.runInInjectionContext(() => new App());

    expect(injectSpy(SeoService).init).toHaveBeenCalledTimes(1);
    expect(injectSpy(StructuredDataService).init).toHaveBeenCalledTimes(1);
  });
});
