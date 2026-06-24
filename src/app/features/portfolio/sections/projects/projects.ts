import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PROJECTS } from '@shared/data/portfolio.data';
import { ProjectCard } from '@shared/components/project-card/project-card';

@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProjectCard],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  readonly projects = PROJECTS;
}
