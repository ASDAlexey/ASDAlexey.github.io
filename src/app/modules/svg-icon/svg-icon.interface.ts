export interface SvgIconType {
  name: string;
  data: string;
}

export class SvgIcon {
  isInitialized = false;

  constructor(public content: string) {}
}
