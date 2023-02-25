import { logger } from '@/lib/logger';
import sha256 from 'crypto-js/sha256';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    await handlePOST(res, req);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

const hashPassword = (password: string) => {
  return sha256(password).toString();
};

// POST /api/user
async function handlePOST(res: NextApiResponse, req: NextApiRequest) {
  try {
    logger.debug('creating user', {
      ...req.body,
      password: hashPassword(req.body.password),
    });
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: hashPassword(req.body.password),
      },
    });
    res.json(user);
  } catch (error) {
    logger.error('error creating user', error);
    res.status(400).end(error.message);
  }
}
