import { ChangeDetectionStrategy, Component } from '@angular/core';

import { About } from './sections/about/about';
import { Experience } from './sections/experience/experience';
import { Hero } from './sections/hero/hero';
import { Projects } from './sections/projects/projects';
import { Recommendations } from './sections/recommendations/recommendations';

@Component({
  selector: 'app-portfolio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Hero, About, Experience, Projects, Recommendations],
  templateUrl: './portfolio.html',
})
export class Portfolio {}
