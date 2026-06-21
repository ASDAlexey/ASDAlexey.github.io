import { inject, Injectable, LOCALE_ID } from '@angular/core';

import { LocaleCode, LocaleOption } from '@core/models/portfolio.interface';
import { LOCALE_LABELS, PROFILE } from '@shared/data/portfolio.data';

@Injectable({ providedIn: 'root' })
export class LocaleService {
  readonly #localeId = inject(LOCALE_ID);

  readonly current: LocaleCode = this.#localeId.startsWith('ru') ? 'ru' : 'en';

  get alternate(): LocaleCode {
    return this.current === 'ru' ? 'en' : 'ru';
  }

  /** Absolute URL of a locale's home page (used for canonical / hreflang). */
  localeUrl(code: LocaleCode): string {
    return `${PROFILE.siteUrl}/${code}/`;
  }

  /** Relative href + label for the language switcher (points to the other locale). */
  get alternateOption(): LocaleOption {
    const code = this.alternate;

    return { code, label: LOCALE_LABELS[code], href: `/${code}/` };
  }
}
