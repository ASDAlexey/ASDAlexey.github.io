import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { SocialIcon } from '@core/models/portfolio.interface';

@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './icon.component.html',
})
export class IconComponent {
  readonly name = input.required<SocialIcon>();
  readonly size = input(20);
}
