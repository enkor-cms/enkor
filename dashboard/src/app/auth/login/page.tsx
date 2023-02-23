'use client';
import { Button } from '@/components/common/button';
import { InputText } from '@/components/common/input';
import { Card } from '@/components/common/layout';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useRef } from 'react';

interface IProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const LoginPage = ({ searchParams }: IProps) => {
  const userName = useRef('');
  const pass = useRef('');

  const onSubmit = async () => {
    const result = await signIn('credentials', {
      username: userName.current,
      password: pass.current,
      redirect: true,
      callbackUrl: '/dashboard',
    });
  };
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="m-3">
        <Image src="/logo.svg" alt="Logo" width={50} height={50} />
      </div>

      <Card className="w-2/6">
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          {searchParams?.message && (
            <p className="text-red-700 bg-red-100 py-2 px-5 rounded-md">
              {searchParams?.message}
            </p>
          )}
          <InputText
            labelText="User Name"
            onChange={(e) => (userName.current = e.target.value)}
          />
          <InputText
            labelText="Password"
            type={'password'}
            onChange={(e) => (pass.current = e.target.value)}
          />
          <div className="w-full flex justify-center">
            <input type="submit" value="Submit" hidden />
            <Button title="Register" variant="primary" formAction="submit" />
            <Button title="Login" variant="secondary" onClick={onSubmit} />
          </div>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
