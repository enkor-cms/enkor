import { IconNames } from '@/components/common/icon';
import { ProviderType } from '@/features/provider';
import { Provider } from '@prisma/client';

export interface IProviderProps {
  label: string;
  value: ProviderType;
  icon: IconNames;
  data?: Provider;
}
