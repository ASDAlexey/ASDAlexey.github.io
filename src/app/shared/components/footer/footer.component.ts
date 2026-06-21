import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PROFILE, SOCIALS } from '@shared/data/portfolio.data';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly profile = PROFILE;
  readonly socials = SOCIALS;
}
