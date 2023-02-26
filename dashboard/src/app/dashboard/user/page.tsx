import { Card, Flex } from '@/components/common/layout';
import { Text } from '@/components/common/text';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { User } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import Image from 'next/image';
import { SignOut } from './SignOut';

async function getUser(id: string): Promise<User> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_LOCAL_AUTH_URL}/api/user/${id}`
  );
  return res.json() as Promise<User>;
}

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  const userSession = session?.user as User;
  const [user] = await Promise.all([getUser(userSession.id)]);

  return (
    <Flex>
      {user?.image ? (
        <Image
          src={user?.image}
          alt={user?.name || "User's profile image"}
          width={100}
          height={100}
          className="rounded-full border-2 border-white-300 dark:border-dark-400"
        />
      ) : (
        <div className="w-8 h-8 rounded-full border-2 border-white-300 dark:border-dark-400 flex justify-center items-center">
          <span className="text-2xl font-bold text-white-300 dark:text-dark-300">
            {user?.name?.charAt(0)}
          </span>
        </div>
      )}
      <Card>
        <Flex direction="row">
          <Text style="body">{user.name}</Text>
        </Flex>
      </Card>
      <SignOut />
    </Flex>
  );
}
