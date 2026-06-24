import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PROFILE, SOCIALS } from '@shared/data/portfolio.data';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  readonly profile = PROFILE;
  readonly socials = SOCIALS;
}
