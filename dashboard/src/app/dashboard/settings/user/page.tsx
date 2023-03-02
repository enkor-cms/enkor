import { Card, Flex } from '@/components/common/layout';
import { Text } from '@/components/common/text';
import { fetcher } from '@/lib';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { User } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { cookies } from 'next/headers';
import Image from 'next/image';
import NotFound from './not-found';

export default async function Page() {
  const session = await getServerSession(authOptions);
  const { status, data } = await fetcher<User>({
    url: `/api/user/${session?.user.id}`,
    cookies: cookies().getAll(),
  });

  if (status !== 200) {
    console.error(data, session);
    return NotFound();
  }

  return (
    <Flex>
      {data?.image ? (
        <Image
          src={data?.image}
          alt={data?.name || "User's profile image"}
          width={100}
          height={100}
          className="rounded-full border-2 border-white-300 dark:border-dark-400"
        />
      ) : (
        <div className="w-8 h-8 rounded-full border-2 border-white-300 dark:border-dark-400 flex justify-center items-center">
          <span className="text-2xl font-bold text-white-300 dark:text-dark-300">
            {data?.name?.charAt(0)}
          </span>
        </div>
      )}
      <Card>
        <Flex direction="row">
          <Text style="body">{data.name}</Text>
        </Flex>
      </Card>
    </Flex>
  );
}
