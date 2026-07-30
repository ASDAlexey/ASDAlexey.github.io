import { RouteLeg } from './route-map.type';

/** SVG user-space size the legs' coordinates are authored against. */
export const ROUTE_MAP_VIEWBOX = '0 0 460 196';

/** Where every route starts: the home base the hub marker pulses on. */
export const ROUTE_HUB = {
  x: 225,
  y: 128,
  label: $localize`:@@hero.map.hub:Taganrog`,
} as const;

/**
 * Countries the work has gone to, laid out roughly by real bearing from the hub
 * — the Americas out to the left, Europe and Russia above, Asia-Pacific to the
 * right. Not a real projection, just enough of one that the directions read.
 *
 * An arc runs from home to each country; the cities inside it hang off that
 * country's node by short spurs, so the map reads as "these countries, and
 * these places within them" rather than as a flat spray of pins.
 *
 * `d` doubles as the arc's geometry and, handed to CSS as `offset-path`, as the
 * track its travelling dot follows — one source of truth for both. `primary`
 * marks the long-running directions, which are drawn brighter. The staggered
 * `delay` keeps the dots from marching in lockstep.
 */
export const ROUTE_LEGS: readonly RouteLeg[] = [
  {
    id: 'us',
    d: 'M225 128 C 160 102, 96 92, 52 74',
    x: 52,
    y: 74,
    labelX: 40,
    labelY: 62,
    anchor: 'middle',
    label: $localize`:@@hero.map.us:USA`,
    primary: false,
    delay: '0s',
    cities: [
      {
        x: 26,
        y: 92,
        labelX: 4,
        labelY: 106,
        anchor: 'start',
        label: $localize`:@@hero.map.us.la:Los Angeles`,
      },
    ],
  },
  {
    id: 'de',
    d: 'M225 128 C 195 92, 160 60, 128 46',
    x: 128,
    y: 46,
    labelX: 122,
    labelY: 34,
    anchor: 'middle',
    label: $localize`:@@hero.map.de:Germany`,
    primary: true,
    delay: '-0.9s',
    cities: [],
  },
  {
    id: 'ru',
    d: 'M225 128 C 224 90, 232 54, 240 32',
    x: 240,
    y: 32,
    labelX: 240,
    labelY: 20,
    anchor: 'middle',
    label: $localize`:@@hero.map.ru:Russia`,
    primary: true,
    delay: '-1.8s',
    cities: [
      { x: 208, y: 48, labelX: 200, labelY: 45, anchor: 'end', label: $localize`:@@hero.map.ru.msk:Moscow` },
      { x: 268, y: 44, labelX: 276, labelY: 41, anchor: 'start', label: $localize`:@@hero.map.ru.spb:SPb` },
      { x: 292, y: 62, labelX: 300, labelY: 66, anchor: 'start', label: $localize`:@@hero.map.ru.nsk:Novosibirsk` },
    ],
  },
  {
    id: 'sg',
    d: 'M225 128 C 292 132, 352 124, 396 104',
    x: 396,
    y: 104,
    labelX: 456,
    labelY: 96,
    anchor: 'end',
    label: $localize`:@@hero.map.sg:Singapore`,
    primary: false,
    delay: '-3.5s',
    cities: [],
  },
  {
    id: 'au',
    d: 'M225 128 C 300 142, 360 154, 408 164',
    x: 408,
    y: 164,
    labelX: 456,
    labelY: 158,
    anchor: 'end',
    label: $localize`:@@hero.map.au:Australia`,
    primary: true,
    delay: '-4.4s',
    cities: [
      {
        x: 386,
        y: 180,
        labelX: 396,
        labelY: 188,
        anchor: 'start',
        label: $localize`:@@hero.map.au.syd:Sydney`,
      },
    ],
  },
];
