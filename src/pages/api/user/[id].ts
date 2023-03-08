import { UserServices } from '@/features/user';
import { exclude } from '@/lib';
import { User } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const methods = {
  GET: handleGET,
  POST: handlePOST,
  DELETE: handleDELETE,
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.query.id as string;
  const method = methods[req.method as keyof typeof methods];

  if (method) {
    method(req, res, userId);
  } else {
    res.setHeader('Allow', Object.keys(methods));
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// GET /api/user/:id
async function handleGET(
  req: NextApiRequest,
  res: NextApiResponse<User>,
  userId: string
) {
  try {
    const user = await UserServices.retrieve(userId);
    res.json(exclude(user, ['password']) as User);
  } catch (error) {
    res.status(404).json(error);
  }
}

// GET /api/user/:id
async function handlePOST(
  req: NextApiRequest,
  res: NextApiResponse<User>,
  userId: string
) {
  try {
    const user = await UserServices.update(userId, req.body);
    return res.json(user);
  } catch (error) {
    res.status(404).json(error);
  }
}

// DELETE /api/user/:id
async function handleDELETE(
  req: NextApiRequest,
  res: NextApiResponse<User>,
  userId: string
) {
  try {
    const user = await UserServices.destroy(userId);
    return res.json(user);
  } catch (error) {
    res.status(404).json(error);
  }
}
