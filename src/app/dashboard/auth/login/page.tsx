import { ProvidersContainer } from '@/components/auth';
import { Flex } from '@/components/common/layout';
import { Text } from '@/components/common/text';

import Image from 'next/image';
interface IProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export const revalidate = 0;

const LoginPage = async ({ searchParams }: IProps) => {
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
          <ProvidersContainer />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
