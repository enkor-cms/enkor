import { ISpotExtanded } from '@/features/spots';

export interface ICluster {
  spots: ISpotExtanded[];
  latitude: number;
  longitude: number;
}
export interface IMapProps {
  spots?: ISpotExtanded[];
}
