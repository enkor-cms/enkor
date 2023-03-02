'use client';
import { Button, Flex } from '@/components/common';
import { Provider } from '@prisma/client';
import { signIn } from 'next-auth/react';

type TProviderContainerProps = {
  providers: Provider[];
};

export const ProvidersContainer = ({ providers }: TProviderContainerProps) => {
  return (
    <>
      {providers.map((provider) => {
        return (
          <Flex key={provider.id}>
            <Button
              title={`Continue with ${provider.name}`}
              variant="primary"
              size="large"
              icon={provider.name}
              onClick={() => {
                signIn(provider.name, { callbackUrl: '/dashboard' });
              }}
              className="w-full"
            />
          </Flex>
        );
      })}
    </>
  );
};
