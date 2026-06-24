import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Stat } from '@core/models/portfolio.interface';

@Component({
  selector: 'app-stat-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.scss',
})
export class StatCard {
  readonly stat = input.required<Stat>();
}
