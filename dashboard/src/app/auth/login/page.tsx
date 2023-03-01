'use client';
import { Button } from '@/components/common/button';
import { InputText } from '@/components/common/input';
import { Flex } from '@/components/common/layout';
import { Tag } from '@/components/common/tags';
import { Text } from '@/components/common/text';
import { NEXT_AUTH_ERROR } from '@/lib';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

interface IProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const LoginPage = ({ searchParams }: IProps) => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (values: { email: string; password: string }) => {
    await signIn('credentials', {
      username: values.email,
      password: values.password,
      redirect: true,
      callbackUrl: '/dashboard',
    });
  };

  const handleGithubLogin = async () => {
    await signIn('github', {
      callbackUrl: '/dashboard',
    });
  };

  const handleGoogleLogin = async () => {
    await signIn('google', {
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
          <Flex>
            <Button
              title="Continue with Google"
              variant="primary"
              size="large"
              icon="google"
              onClick={() => handleGoogleLogin()}
              className="w-full"
            />
          </Flex>
          <div className="w-auto border border-white-300 dark:border-dark-300 rounded m-4"></div>
          <form onSubmit={handleSubmit(onSubmit())}>
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
              {searchParams?.error && (
                <Tag
                  text={NEXT_AUTH_ERROR[searchParams.error as string]}
                  color="red"
                  size="medium"
                />
              )}
              <Button
                title="Login"
                variant="default"
                size="large"
                onClick={onSubmit}
                isLoader={isSubmitting}
                className="w-full m-4"
              />
            </Flex>
          </form>
          <Flex direction="row">
            <Text style="caption">Don't have an account?</Text>
            <Text
              style="caption"
              className="text-brand-300 hover:text-brand-400"
            >
              <Link href="/auth/register">Register now</Link>
            </Text>
          </Flex>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
