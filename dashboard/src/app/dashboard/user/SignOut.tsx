'use client';

import { Button } from '@/components/common/button';
import { signOut } from 'next-auth/react';

export const SignOut = () => {
  return (
    <Button
      title="Sign Out"
      variant="alert"
      onClick={() => {
        signOut();
      }}
    />
  );
};
