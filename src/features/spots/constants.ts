import { getEnumValues } from '@/lib';
import { Database } from '@/lib/db_types';

export const SPOT_DIFFICULTIES = getEnumValues<
  Database['public']['Enums']['difficulty']
>('Easy', 'Medium', 'Hard');

export const SPOT_TYPES = getEnumValues<Database['public']['Enums']['type']>(
  'Indoor',
  'Outdoor',
);

export const SPOT_ORIENTATIONS = getEnumValues<
  Database['public']['Enums']['orientation']
>('N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW');
