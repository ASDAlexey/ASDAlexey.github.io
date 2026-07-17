import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ScrollReveal } from '@shared/directives/scroll-reveal/scroll-reveal';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScrollReveal],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {}
