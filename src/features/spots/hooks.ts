'use client';

import React, { useState } from 'react';

type CustomFormValues<T> = {
  [K in keyof T]: T[K];
};

type CustomFormSetters<T> = {
  [K in keyof T]: React.Dispatch<React.SetStateAction<T[K]>>;
};

function useCustomForm<T extends object>(
  initialState: T,
): [CustomFormValues<T>, CustomFormSetters<T>] {
  if (!initialState) {
    throw new Error('Initial state must be provided');
  }

  const [state, setState] = useState(initialState);

  const setFormValue = (key: keyof T) => (value: T[typeof key]) => {
    setState((prevState) => ({ ...prevState, [key]: value }));
  };

  const formValues = Object.keys(initialState).reduce((acc, key) => {
    const stateKey = key as keyof T;
    acc[stateKey] = state[stateKey];
    return acc;
  }, {} as CustomFormValues<T>);

  const formSetters = Object.keys(initialState).reduce((acc, key) => {
    const stateKey = key as keyof T;
    acc[stateKey] = setFormValue(stateKey);
    return acc;
  }, {} as CustomFormSetters<T>);

  return [formValues, formSetters];
}

export default useCustomForm;
