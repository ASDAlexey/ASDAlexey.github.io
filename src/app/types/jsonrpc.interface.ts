import { ObjectInfo } from '../components/object-card/object-card.interface';
import { RpcMessages } from '../enums/rpc-messages.enum';
import { Feature, FeatureBackend } from '../modules/toolbar/features/features.interface';
import { Layer, LayerState } from '../modules/toolbar/layers/layers.interface';
import { Level } from '../modules/toolbar/levels/levels.interface';
import { Doc } from '../modules/toolbar/search/search.interface';

// Results:
// Backend events result types: RpcService.sendRequest
export type PONG = 'pong';
export type SUCCESS = { success: boolean };
export type GetUnrealProjectVersionResult = { version: string };
export type FindBuildingsByKeywordsResult = { buildings: Doc[] };
export type GetLayersResult = { layers: Layer[] };
export type ToggleLayersResult = { layers: LayerState[] };
export type GetFeaturesResult = { features: Feature[] };
export type GetLevelsResult = { levels: Level[] };

export type EventDataResult =
  | FindBuildingsByKeywordsResult
  | GetFeaturesResult
  | GetLayersResult
  | GetLevelsResult
  | GetUnrealProjectVersionResult
  | PONG
  | SUCCESS
  | ToggleLayersResult;

// Params:
export type FindBuildingsByKeywordsParam = { query: string };
export type SetCartographicDragEnabledParam = { value: boolean };
export type ToggleLayersParam = { layers: Pick<Layer, 'guid' | 'isEnabled'>[] };
export type ToggleFeatureParam = { feature: FeatureBackend };
export type OpenLevelByNameParam = { level: Level['name'] };
export type OpenObjectCardParam = { objectInfo: ObjectInfo };

export type EventDataParams =
  | Doc
  | FindBuildingsByKeywordsParam
  | OpenLevelByNameParam
  | OpenObjectCardParam
  | SetCartographicDragEnabledParam
  | ToggleFeatureParam
  | ToggleLayersParam;

export interface EventData<T extends { params?: EventDataParams; result?: EventDataResult }> {
  guid: string;
  jsonrpc: string;
  method?: (typeof RpcMessages)[keyof typeof RpcMessages];
  params: T['params'];
  result?: T['result'];
}
