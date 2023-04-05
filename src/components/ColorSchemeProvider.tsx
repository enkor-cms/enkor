'use client';

import usePreferredColorScheme, { ColorScheme } from '@/hooks/useColorScheme';
import { logger } from '@/lib/logger';
import React, { createContext, useContext, useEffect } from 'react';

const ColorSchemeContext = createContext<{
  colorScheme: ColorScheme;
}>({
  colorScheme: 'light',
});

export const useColorScheme = () => {
  return useContext(ColorSchemeContext);
};

export const ColorSchemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const colorScheme = usePreferredColorScheme();

  useEffect(() => {
    logger.debug('ColorSchemeProvider', { colorScheme });
  }, [colorScheme]);

  return (
    <ColorSchemeContext.Provider value={{ colorScheme }}>
      {children}
    </ColorSchemeContext.Provider>
  );
};
