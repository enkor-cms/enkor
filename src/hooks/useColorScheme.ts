// useSystemPreferredColorScheme.ts
import { useEffect, useState } from 'react';

export type ColorScheme = 'light' | 'dark';

const useSystemPreferredColorScheme = (): ColorScheme => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');

  const applyColorScheme = (scheme: ColorScheme) => {
    if (scheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    const updateSystemColorScheme = (matches: boolean) => {
      const preferredScheme: ColorScheme = matches ? 'dark' : 'light';
      setColorScheme(preferredScheme);
      applyColorScheme(preferredScheme);
    };

    if (typeof window !== 'undefined' && 'matchMedia' in window) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      updateSystemColorScheme(mq.matches);

      mq.addEventListener('change', (event) => {
        updateSystemColorScheme(event.matches);
      });

      return () => {
        mq.removeEventListener('change', (event) => {
          updateSystemColorScheme(event.matches);
        });
      };
    }
  }, []);

  return colorScheme;
};

export default useSystemPreferredColorScheme;
