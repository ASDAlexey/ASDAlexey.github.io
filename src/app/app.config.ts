import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideClientHydration, withI18nSupport } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    // `withI18nSupport()` is not optional here, it is the whole thing working. Every template
    // in this app carries `i18n` blocks, and without i18n hydration Angular refuses to hydrate
    // a component that has one: it stamps `ngSkipHydration` on <app-root>, and the browser
    // throws away the entire prerendered page and rebuilds it. Measured before adding it:
    // "Angular hydrated 0 component(s) and 0 node(s)".
    //
    // Event replay and incremental hydration are on by default with `provideClientHydration()`
    // in v20+, so `withEventReplay()` would only repeat what is already there. Incremental
    // hydration is what lets `@defer (hydrate on viewport)` prerender its content.
    provideClientHydration(withI18nSupport()),
  ],
};
