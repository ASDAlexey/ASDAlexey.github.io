import { prefersReducedMotion } from './motion';

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
