/** The slice of Swiper's API the gallery drives — the carousel itself owns everything else. */
export interface SwiperHandle {
  readonly activeIndex: number;
  slideTo(index: number): void;
}

/** `<swiper-container>` once it has upgraded: the element with the carousel hung off it. */
interface SwiperHost extends Element {
  readonly swiper?: SwiperHandle;
}

/**
 * The WebP twin of an AVIF path. The generator writes both next to each other under the same stem,
 * so the manifest carries one URL and the `<picture>` derives the fallback instead of storing it
 * twice per slide.
 */
export function toWebp(src: string): string {
  return src.replace(/\.avif$/, '.webp');
}

/**
 * The Swiper instance behind the carousel, once the element has upgraded.
 *
 * Reached for through the DOM rather than held in a `viewChild`: `<swiper-container>` is a custom
 * element, so Angular hands back the host and the carousel API lives on it as a property that only
 * exists after `register()` has run and the element has initialised itself.
 */
export function swiperOf(dialog: HTMLDialogElement | undefined): SwiperHandle | undefined {
  return dialog?.querySelector<SwiperHost>('swiper-container')?.swiper;
}

/**
 * Defines `<swiper-container>`, pulling the carousel in as its own chunk.
 *
 * Deferred and browser-only on purpose: `register()` reaches for `window`, this site is
 * prerendered, and three hundred kilobytes of carousel have no business in the bundle that paints
 * the first screen.
 */
export async function registerSwiper(): Promise<void> {
  const { register } = await import('swiper/element/bundle');

  register();
}
