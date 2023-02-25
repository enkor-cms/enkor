'use client';
import { Button } from '@/components/common/button';
import { InputText } from '@/components/common/input';
import { Flex } from '@/components/common/layout';
import { Tag } from '@/components/common/tags';
import { Text } from '@/components/common/text';
import { User } from '@prisma/client';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface IProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const RegisterPage = ({ searchParams }: IProps) => {
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

  const handleGithubLogin = async () => {
    await signIn('github', {
      callbackUrl: '/dashboard',
    });
  };

  return (
    <>
      <Flex className="absolute top-0 w-full p-10" direction="row">
        <div className="m-2">
          <Image src="/logo.svg" alt="Logo" width={20} height={20} />
        </div>
        <Text style="subtitle">enkor</Text>
      </Flex>
      <div className="h-full flex flex-col justify-center items-center">
        <div className="w-2/6">
          <Flex>
            <Button
              title="Continue with Github"
              variant="primary"
              size="large"
              icon="github"
              onClick={() => handleGithubLogin()}
              className="w-full"
            />
          </Flex>
          <div className="w-auto border border-white-300 dark:border-dark-300 rounded m-4"></div>
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

          <Flex direction="row">
            <Text style="caption">Already have an account? </Text>
            <Text
              style="caption"
              className="text-brand-300 hover:text-brand-400"
            >
              <Link href="/auth/login">Login now</Link>
            </Text>
          </Flex>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
