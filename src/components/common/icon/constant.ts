import React from 'react';
import ArrowRight from './svg/arrow-right';
import Bolt from './svg/bolt';
import Cog from './svg/cog';
import Cross from './svg/cross';
import Eye from './svg/eye';
import EyeClosed from './svg/eye-closed';
import Github from './svg/github';
import Google from './svg/google';
import Models from './svg/models';
import Photo from './svg/photo';
import Puzzle from './svg/puzzle';
import Servers from './svg/servers';
import Spin from './svg/spin';
import Swatch from './svg/swatch';
import UserCircle from './svg/user-circle';

export const icons: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  'arrow-right': ArrowRight,
  bolt: Bolt,
  spin: Spin,
  cross: Cross,
  models: Models,
  swatch: Swatch,
  servers: Servers,
  cog: Cog,
  photo: Photo,
  github: Github,
  google: Google,
  'user-circle': UserCircle,
  puzzle: Puzzle,
  eye: Eye,
  'eye-closed': EyeClosed,
};
