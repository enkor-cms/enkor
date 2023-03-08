export const providersAvailable = {
  github: 'github',
  google: 'google',
};

export type ProviderType = keyof typeof providersAvailable;
