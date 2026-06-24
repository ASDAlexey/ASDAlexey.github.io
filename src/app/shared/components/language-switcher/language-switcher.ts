import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { LocaleService } from '@core/services/locale.service';
import { LocaleOption } from '@core/models/portfolio.interface';

export const LANG_CHOICE_KEY = 'portfolio-lang';

@Component({
  selector: 'app-language-switcher',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.scss',
})
export class LanguageSwitcher {
  readonly #locale = inject(LocaleService);

  readonly option: LocaleOption = this.#locale.alternateOption;

  /** Remember the chosen locale so the root redirect honours it next time. */
  persist(): void {
    try {
      sessionStorage.setItem(LANG_CHOICE_KEY, this.option.code);
    } catch {
      // sessionStorage unavailable (e.g. prerender) — ignore.
    }
  }
}
