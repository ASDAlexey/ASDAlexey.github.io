import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Icon } from '@shared/components/icon/icon';
import { PLATFORMS, PROFILE, STATS } from '@shared/data/portfolio.data';
import { StatCard } from '@shared/components/stat-card/stat-card';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, StatCard],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  readonly profile = PROFILE;
  readonly platforms = PLATFORMS;
  readonly stats = STATS;
}
