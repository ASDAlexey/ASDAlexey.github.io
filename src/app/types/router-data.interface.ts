import { ConfigKeys } from '../modules/feature-flag/feature-flag.service';

export interface RouterData {
  title: string;
  hiddenTitle?: boolean;
  featureFlagKey?: ConfigKeys;
  noBorder?: boolean;
}
