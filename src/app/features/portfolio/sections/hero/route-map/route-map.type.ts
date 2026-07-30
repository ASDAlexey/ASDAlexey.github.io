/** Text anchoring — captions at the edges hug them instead of centring. */
export type LabelAnchor = 'end' | 'middle' | 'start';

/** A city hanging off its country's node by a short spur. */
export interface RouteCity {
  x: number;
  y: number;
  labelX: number;
  labelY: number;
  anchor: LabelAnchor;
  label: string;
}

/**
 * One country on the hero's route map: the arc reaching it from home, the node
 * at its end, its caption, and the cities worked with inside it.
 */
export interface RouteLeg {
  /** Stable key for `@for` tracking. */
  id: string;
  /** SVG path data — drawn as the arc and reused as the dot's motion track. */
  d: string;
  /** Country node coordinates (the arc's end point). */
  x: number;
  y: number;
  /** Country caption anchor, offset from the node so the text clears the arc. */
  labelX: number;
  labelY: number;
  anchor: LabelAnchor;
  label: string;
  /** Long-running directions, drawn brighter than the occasional ones. */
  primary: boolean;
  /** Negative animation delay, so each dot starts mid-flight instead of queued. */
  delay: string;
  /** Cities inside the country; empty when the country is the whole story. */
  cities: readonly RouteCity[];
}
