'use client';

import { Provider } from 'jotai';

export const JobaiProvider = ({ children }) => {
  return <Provider>{children}</Provider>;
};
