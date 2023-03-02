import { UserServices } from '@/features/user';
import { logger } from '@/lib/logger';
import type { NextApiRequest, NextApiResponse } from 'next';

const methods = {
  POST: handlePOST,
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

// POST /api/user
async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  try {
    logger.info('creating user', req.body);
    const user = UserServices.create(req.body);
    res.json(user);
  } catch (error) {
    logger.error('error creating user', error);
    res.status(400).end(error);
  }
}
