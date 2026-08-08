export interface ExperienceMedia {
  readonly href: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly caption: string;
}

export interface Experience {
  readonly role: string;
  readonly company: string | null;
  readonly location: string;
  readonly period: string;
  readonly description: string;
  readonly highlights?: readonly string[];
  readonly tags: readonly string[];
  readonly badge?: string;
  readonly media?: ExperienceMedia;
  readonly links?: readonly ProjectLink[];
}

export interface ProjectLink {
  readonly label: string;
  readonly href: string;
}

/**
 * One screenshot, already re-encoded. `src` is the AVIF the browser gets first; the WebP beside it
 * is derived by swapping the extension, so the manifest carries one path instead of four.
 * `width`/`height` are the encoded pixels — the tile reserves the right box before the file lands.
 */
export interface GallerySlide {
  readonly id: string;
  readonly src: string;
  readonly thumb: string;
  readonly width: number;
  readonly height: number;
  // SVG diagrams have no AVIF/WebP pair and are shown whole rather than cropped.
  readonly vector: boolean;
}

/** Both locales always resolve: the generator fills an empty one from its neighbour. */
export interface ProjectGallery {
  readonly en: readonly GallerySlide[];
  readonly ru: readonly GallerySlide[];
}

export interface Project {
  readonly name: string;
  readonly badge: string;
  readonly description: string;
  readonly links: readonly ProjectLink[];
  readonly tags: readonly string[];
  readonly featured: boolean;
  // Key into PROJECT_GALLERIES — the folder name under `static/my-projects/`.
  readonly gallery?: string;
  readonly imageAlt?: string;
  // Which slide the card tile shows; defaults to the first. A gallery's opening shot is not always
  // its most legible one at 76 px wide.
  readonly cover?: string;
}

export interface Stat {
  readonly value: string;
  readonly suffix: string;
  readonly caption: string;
}

/** A labelled line under the About copy — the résumé's education / languages footer. */
export interface Credential {
  readonly label: string;
  readonly value: string;
}

export interface Testimonial {
  readonly quote: string;
  readonly author: string;
  readonly title: string;
  readonly href?: string;
  readonly image?: string;
}

export type SocialIcon = 'github' | 'linkedin' | 'max' | 'resume' | 'telegram';

export interface SocialLink {
  readonly label: string;
  readonly href: string;
  readonly icon: SocialIcon;
  readonly download?: boolean;
}

export type LocaleCode = 'en' | 'ru';

export interface LocaleOption {
  readonly code: LocaleCode;
  readonly label: string;
  readonly href: string;
}
