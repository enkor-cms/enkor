import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

export const checkSession = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<boolean> => {
  const session = await getServerSession(req, res, authOptions);
  return session ? true : false;
};
