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
    const user = await UserServices.checkCredentials(
      req.body.email,
      req.body.password
    );
    logger.debug('user', user);
    res.json(user);
  } catch (error) {
    logger.error('error', error);
    res.status(403).json(error);
  }
}
