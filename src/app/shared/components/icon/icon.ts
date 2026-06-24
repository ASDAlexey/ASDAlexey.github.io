import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { SocialIcon } from '@core/models/portfolio.interface';

@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './icon.html',
})
export class Icon {
  readonly name = input.required<SocialIcon>();
  readonly size = input(20);
}
