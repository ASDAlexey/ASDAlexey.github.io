import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PROFILE, SOCIALS } from '@shared/data/portfolio.data';
import { ScrollReveal } from '@shared/directives/scroll-reveal/scroll-reveal';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScrollReveal],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  readonly profile = PROFILE;
  readonly socials = SOCIALS;
}
