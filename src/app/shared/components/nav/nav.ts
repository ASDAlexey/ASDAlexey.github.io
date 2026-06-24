import { ChangeDetectionStrategy, Component } from '@angular/core';

import { LanguageSwitcher } from '../language-switcher/language-switcher';
import { PROFILE } from '@shared/data/portfolio.data';

@Component({
  selector: 'app-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LanguageSwitcher],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {
  readonly profile = PROFILE;
}
