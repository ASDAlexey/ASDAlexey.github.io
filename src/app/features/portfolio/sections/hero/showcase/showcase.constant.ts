// Mock data for the hero "command center" showcase panel. Purely decorative
// (the panel is aria-hidden); values mirror the profile's real headline numbers
// so the visual reinforces the copy above it rather than inventing figures.

export interface ShowcaseChip {
  readonly label: string;
  readonly tone: 'blue' | 'gold';
  readonly pos: 'bl' | 'br' | 'tl' | 'tr';
}

export interface ShowcaseBar {
  readonly label: string;
  readonly value: number; // 0–100, drives the bar height
}

export const SHOWCASE_CHIPS: readonly ShowcaseChip[] = [
  { label: '100% coverage', tone: 'gold', pos: 'tl' },
  { label: 'SSR · prerendered', tone: 'blue', pos: 'tr' },
  { label: 'Nx monorepo', tone: 'gold', pos: 'bl' },
  { label: 'Tauri · Rust', tone: 'blue', pos: 'br' },
];

export const SHOWCASE_PLATFORM_BARS: readonly ShowcaseBar[] = [
  { label: 'Web', value: 96 },
  { label: 'TV', value: 74 },
  { label: 'Mob', value: 88 },
  { label: 'Dsk', value: 62 },
];

// Coverage ring — percentage shown as the panel's focal metric.
export const SHOWCASE_COVERAGE = 100;

// Switchable editor tabs — component, template, styles and a live-looking test.
// Angular 20+ suffix-less file naming (hero.ts / hero.html / hero.scss / hero.spec.ts).
export type ShowcaseFile = 'html' | 'scss' | 'spec' | 'ts';

export interface ShowcaseTab {
  readonly key: ShowcaseFile;
  readonly name: string;
}

export const SHOWCASE_FILES: readonly ShowcaseTab[] = [
  { key: 'ts', name: 'hero.ts' },
  { key: 'spec', name: 'hero.spec.ts' },
  { key: 'html', name: 'hero.html' },
  { key: 'scss', name: 'hero.scss' },
];

// Line count per file, used to render the gutter for the active tab.
export const SHOWCASE_LINE_COUNT: Readonly<Record<ShowcaseFile, number>> = {
  ts: 15,
  html: 13,
  scss: 15,
  spec: 17,
};

export const showcaseGutter = (lines: number): readonly number[] => Array.from({ length: lines }, (_, i) => i + 1);
