import { prefersReducedMotion, supportsHover } from './motion';

describe('prefersReducedMotion', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('reports what the media query says', () => {
    vi.stubGlobal('matchMedia', (query: string) => ({ matches: query === '(prefers-reduced-motion: reduce)' }));

    expect(prefersReducedMotion()).toBe(true);
  });

  it('is false when the user has no preference', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: false }));

    expect(prefersReducedMotion()).toBe(false);
  });

  it('is false on the server, where matchMedia does not exist', () => {
    vi.stubGlobal('matchMedia', undefined);

    expect(prefersReducedMotion()).toBe(false);
  });
});

describe('supportsHover', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('reports a mouse or trackpad, and nothing on a touch screen or the server', () => {
    vi.stubGlobal('matchMedia', (query: string) => ({ matches: query === '(hover: hover) and (pointer: fine)' }));
    expect(supportsHover()).toBe(true);

    vi.stubGlobal('matchMedia', () => ({ matches: false }));
    expect(supportsHover()).toBe(false);

    vi.stubGlobal('matchMedia', undefined);
    expect(supportsHover()).toBe(false);
  });
});
