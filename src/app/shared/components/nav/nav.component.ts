import { ChangeDetectionStrategy, Component } from '@angular/core';

import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { PROFILE } from '@shared/data/portfolio.data';

@Component({
  selector: 'app-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LanguageSwitcherComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  readonly profile = PROFILE;
}
