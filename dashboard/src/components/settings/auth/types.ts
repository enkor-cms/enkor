import { IconNames } from '@/components/common/icon';
import { Provider } from '@prisma/client';

type ProviderType = 'google' | 'github';

export interface IProviderProps {
  label: string;
  value: ProviderType;
  icon: IconNames;
  data?: Provider;
}
