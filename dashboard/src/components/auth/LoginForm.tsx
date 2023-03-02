'use client';

import { Button, Flex, InputText, Tag } from '@/components/common';
import { NEXT_AUTH_ERROR } from '@/lib';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';

type TLoginFormProps = {
  error?: string;
};

export const LoginForm = ({ error }: TLoginFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (values: any) => {
    console.log(values);
    // wait 1 second
    await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: true,
      callbackUrl: '/dashboard',
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex>
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
        {error && (
          <Tag
            text={NEXT_AUTH_ERROR[error as string]}
            color="red"
            size="medium"
          />
        )}
        <Button
          title="Login"
          variant="default"
          size="large"
          onClick={handleSubmit(onSubmit)}
          isLoader={isSubmitting}
          className="w-full m-4"
        />
      </Flex>
    </form>
  );
};
