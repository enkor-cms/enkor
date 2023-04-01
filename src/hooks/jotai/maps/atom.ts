import { GetSpotResponseSuccess } from '@/features/spots';
import { atom } from 'jotai';

export const actualSpotAtom = atom<GetSpotResponseSuccess | undefined>(
  undefined,
);
