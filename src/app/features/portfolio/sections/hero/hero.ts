import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DecodeText } from '@shared/directives/decode-text/decode-text';
import { HeroShowcase } from './showcase/showcase';
import { Icon } from '@shared/components/icon/icon';
import { PLATFORMS, PROFILE, STATS } from '@shared/data/portfolio.data';
import { PointerTrack } from '@shared/directives/pointer-track/pointer-track';
import { RouteMap } from './route-map/route-map';
import { ScrollReveal } from '@shared/directives/scroll-reveal/scroll-reveal';
import { StatCard } from '@shared/components/stat-card/stat-card';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, StatCard, HeroShowcase, ScrollReveal, PointerTrack, DecodeText, RouteMap],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  readonly profile = PROFILE;
  readonly platforms = PLATFORMS;
  readonly stats = STATS;
}
