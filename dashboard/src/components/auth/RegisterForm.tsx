'use client';

import { Button, Flex, InputText, Tag } from '@/components/common';
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
      const res = await fetch(`/api/user/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values }),
      });

      if (!res.ok) {
        await res.body
          ?.getReader()
          .read()
          .then(({ value }) => {
            const message = new TextDecoder().decode(value);
            setError(message as string);
            console.error(error);
          });
      } else {
        const userCreated: User = await res.json();
        setSuccess(`${userCreated.name}`);
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
      console.error(error);
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
          onClick={onSubmit}
          isLoader={isSubmitting || success ? true : false}
          className="w-full m-4"
        />
      </Flex>
    </form>
  );
};
