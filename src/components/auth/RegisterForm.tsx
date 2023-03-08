'use client';

import { Button, Flex, InputText, Tag } from '@/components/common';
import { fetcher } from '@/lib';
import { logger } from '@/lib/logger';
import { User } from '@prisma/client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type TRegisterFormProps = {};

export const RegisterForm = ({}: TRegisterFormProps) => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm();

  async function onSubmit(values: any) {
    try {
      logger.debug(values);
      const { status, data: user } = await fetcher<User>({
        url: '/api/user/create',
        method: 'POST',
        cookies: [],
        body: {
          name: values.name,
          email: values.email,
          password: values.password,
        },
      });

      if (status === 404) {
        setError('Error creating user');
      } else {
        setSuccess(`${user.name}`);
        setTimeout(() => {
          signIn('credentials', {
            username: values.email,
            password: values.password,
            redirect: true,
            callbackUrl: '/dashboard',
          });
        }, 3000);
      }
    } catch (error) {
      logger.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex>
        <InputText
          labelText="Full Name"
          {...register('name')}
          className="w-full"
          placeholder="John Doe"
        />
        <InputText
          labelText="Email"
          {...register('email')}
          className="w-full"
          placeholder="example@example.com"
        />
        <InputText
          labelText="Password"
          {...register('password')}
          type="password"
          className="w-full"
          placeholder="•••••••"
        />
        <input type="submit" value="Submit" hidden />
        {error && <Tag text={error} color="red" size="medium" />}
        {success && (
          <Tag
            text={`User created, you will be redirected to login page in 3 seconds`}
            color="green"
            size="medium"
          />
        )}
        <Button
          title="Register"
          variant="default"
          size="large"
          onClick={handleSubmit(onSubmit)}
          isLoader={isSubmitting || success ? true : false}
          className="w-full m-4"
        />
      </Flex>
    </form>
  );
};
