import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconComponent } from '@shared/components/icon/icon.component';
import { PLATFORMS, PROFILE, STATS } from '@shared/data/portfolio.data';
import { StatCardComponent } from '@shared/components/stat-card/stat-card.component';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, StatCardComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  readonly profile = PROFILE;
  readonly platforms = PLATFORMS;
  readonly stats = STATS;
}
