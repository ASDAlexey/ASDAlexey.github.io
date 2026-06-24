import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Project } from '@core/models/portfolio.interface';

@Component({
  selector: 'app-project-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
})
export class ProjectCard {
  readonly project = input.required<Project>();
}
