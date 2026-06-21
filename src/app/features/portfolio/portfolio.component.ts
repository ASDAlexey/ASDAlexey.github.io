import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AboutComponent } from './sections/about/about.component';
import { ExperienceComponent } from './sections/experience/experience.component';
import { HeroComponent } from './sections/hero/hero.component';
import { ProjectsComponent } from './sections/projects/projects.component';

@Component({
  selector: 'app-portfolio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HeroComponent, AboutComponent, ExperienceComponent, ProjectsComponent],
  templateUrl: './portfolio.component.html',
})
export class PortfolioComponent {}
