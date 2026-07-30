import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ROUTE_HUB, ROUTE_LEGS, ROUTE_MAP_VIEWBOX } from './route-map.constant';

/**
 * Decorative "remote-first" map: a pulsing home marker with arcs reaching the
 * places the work goes, each with a dot flying along it.
 *
 * Everything animates in CSS — the arcs are drawn with `stroke-dasharray` and
 * the dots ride the very same path data through `offset-path`, so there is no
 * JavaScript and nothing to tear down. Hidden from assistive tech: the same
 * facts are already stated in the hero's location line next to it.
 */
@Component({
  selector: 'app-route-map',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './route-map.html',
  styleUrl: './route-map.scss',
})
export class RouteMap {
  readonly viewBox = ROUTE_MAP_VIEWBOX;
  readonly hub = ROUTE_HUB;
  readonly legs = ROUTE_LEGS;

  /** `offset-path` value for a leg — the arc's own geometry, handed to CSS. */
  offsetPath(d: string): string {
    return `path('${d}')`;
  }
}
