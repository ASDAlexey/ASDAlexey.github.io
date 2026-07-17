import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PROJECTS } from '@shared/data/portfolio.data';
import { ProjectCard } from '@shared/components/project-card/project-card';
import { ScrollReveal } from '@shared/directives/scroll-reveal/scroll-reveal';

@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProjectCard, ScrollReveal],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  readonly projects = PROJECTS;
}
