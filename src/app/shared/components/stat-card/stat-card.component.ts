import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Stat } from '@core/models/portfolio.interface';

@Component({
  selector: 'app-stat-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss',
})
export class StatCardComponent {
  readonly stat = input.required<Stat>();
}
