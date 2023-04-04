'use client';
'use strict';

import { getDictionary } from '@/lib/get-dictionary';
import React from 'react';

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

export type DictionaryProviderProps = {
  children: React.ReactNode;
  dictionary: Dictionary;
};

// Add a generic type parameter to the context
export const DictionaryContext = React.createContext<Dictionary | null>(null);

// Update the DictionaryProvider to accept a generic type parameter
export function DictionaryProvider<T>({
  children,
  dictionary,
}: DictionaryProviderProps) {
  return (
    <DictionaryContext.Provider value={dictionary}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useDictionary() {
  const dictionary = React.useContext(DictionaryContext);

  if (!dictionary) {
    throw new Error('Dictionary context is not available');
  }

  return dictionary;
}
