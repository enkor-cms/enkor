import { UserServices } from '@/features/user';
import { logger } from '@/lib/logger';
import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const methods = {
  GET: handleGET,
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = methods[req.method as keyof typeof methods];
  if (method) {
    method(req, res);
  } else {
    res.setHeader('Allow', Object.keys(methods));
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// GET /api/user
async function handleGET(
  req: NextApiRequest,
  res: NextApiResponse<User[] | string>
) {
  try {
    const users = await UserServices.list();
    res.status(200).json(users);
  } catch (error) {
    logger.error('error', error);
    res.status(404).send(error as string);
  }
}
