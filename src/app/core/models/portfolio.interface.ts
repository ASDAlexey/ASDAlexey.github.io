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
  readonly tags: readonly string[];
  readonly badge?: string;
  readonly media?: ExperienceMedia;
  readonly links?: readonly ProjectLink[];
}

export interface ProjectLink {
  readonly label: string;
  readonly href: string;
}

export interface Project {
  readonly name: string;
  readonly badge: string;
  readonly description: string;
  readonly links: readonly ProjectLink[];
  readonly tags: readonly string[];
  readonly featured: boolean;
}

export interface Stat {
  readonly value: string;
  readonly suffix: string;
  readonly caption: string;
}

export interface Testimonial {
  readonly quote: string;
  readonly author: string;
  readonly title: string;
  readonly href?: string;
  readonly image?: string;
}

export type SocialIcon = 'telegram' | 'github' | 'linkedin';

export interface SocialLink {
  readonly label: string;
  readonly href: string;
  readonly icon: SocialIcon;
}

export type LocaleCode = 'en' | 'ru';

export interface LocaleOption {
  readonly code: LocaleCode;
  readonly label: string;
  readonly href: string;
}
