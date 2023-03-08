import { Card, Flex } from '@/components/common/layout';
import { Text } from '@/components/common/text';
import { IProviderProps, ProviderBlock } from '@/components/settings/auth';
import { fetcher } from '@/lib';
import { Provider } from '@prisma/client';
import { cookies } from 'next/headers';

export default async function Page() {
  const databaseProviders = await fetcher<Provider[]>({
    url: '/api/providers',
    cookies: cookies().getAll(),
    revalidation: 5,
  });

  const providers: IProviderProps[] = [
    {
      icon: 'google',
      label: 'Google',
      value: 'google',
      data: databaseProviders.data.find(
        (provider) => provider.name === 'google'
      ),
    },
    {
      icon: 'github',
      label: 'Github',
      value: 'github',
      data: databaseProviders.data.find(
        (provider) => provider.name === 'github'
      ),
    },
  ];

  return (
    <Flex
      fullSize
      horizontalAlign="left"
      verticalAlign="top"
      className="p-4 pr-8"
    >
      <Text style="title" className="w-full text-left">
        Configure your authentification providers
      </Text>
      <Card className="w-5/6 p-0 my-3">
        <div className="grid grid-cols-1 divide-y dark:divide-dark-300 divide-white-300">
          {providers.map((provider) => (
            <ProviderBlock key={provider.value} {...provider} />
          ))}
        </div>
      </Card>
    </Flex>
  );
}
