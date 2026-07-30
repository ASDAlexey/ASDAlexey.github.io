/** The sequence, lower-cased, as `KeyboardEvent.key` reports it. */
export const KONAMI_SEQUENCE: readonly string[] = [
  'arrowup',
  'arrowup',
  'arrowdown',
  'arrowdown',
  'arrowleft',
  'arrowright',
  'arrowleft',
  'arrowright',
  'b',
  'a',
];

/** Lines the fake terminal prints, in order, one per tick. */
export const KONAMI_OUTPUT: readonly string[] = [
  '$ whoami',
  'alexey popov — tech lead, senior frontend',
  '',
  '$ cat stack.json',
  '{',
  '  "core":      "Angular · TypeScript · RxJS · NgRx",',
  '  "platforms": ["web/ssr", "smart tv", "ionic", "tauri"],',
  '  "infra":     "GitLab CI/CD · Docker · Nx · Nginx",',
  '  "rust":      "tauri backends, image/video engines",',
  '  "coverage":  "100%"',
  '}',
  '',
  '$ echo $MOTTO',
  'ship it, test it, then make it fast',
  '',
  '$ _',
];

/** Delay between printed lines, in milliseconds. */
export const KONAMI_LINE_MS = 130;
