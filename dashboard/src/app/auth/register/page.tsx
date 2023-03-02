import { ProvidersContainer, RegisterForm } from '@/components/auth';
import { Flex } from '@/components/common/layout';
import { Text } from '@/components/common/text';
import { fetcher } from '@/lib';
import { Provider } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

interface IProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const RegisterPage = async ({ searchParams }: IProps) => {
  const { status, data: providers } = await fetcher<Provider[]>({
    url: '/api/providers',
    method: 'GET',
    cookies: [],
  });

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
          <ProvidersContainer providers={providers} />
          <div className="w-auto border border-white-300 dark:border-dark-300 rounded m-4"></div>
          <RegisterForm />
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
