import React from 'react';
import ArrowRight from './svg/arrow-right';
import Bolt from './svg/bolt';
import Cross from './svg/cross';
import Spin from './svg/spin';

export const icons: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  'arrow-right': ArrowRight,
  bolt: Bolt,
  spin: Spin,
  cross: Cross,
};
