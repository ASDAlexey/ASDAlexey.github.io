import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Pipeline } from './pipeline/pipeline';
import { ScrollReveal } from '@shared/directives/scroll-reveal/scroll-reveal';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScrollReveal, Pipeline],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {}
