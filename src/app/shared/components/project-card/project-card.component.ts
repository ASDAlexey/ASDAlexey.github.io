import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Project } from '@core/models/portfolio.interface';

@Component({
  selector: 'app-project-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
})
export class ProjectCardComponent {
  readonly project = input.required<Project>();
}
