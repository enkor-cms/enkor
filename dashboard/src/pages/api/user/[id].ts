import { exclude } from '@/lib';
import prisma from '@/lib/prisma';
import { User } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.query.id as string;

  if (req.method === 'GET') {
    handleGET(userId, res);
  } else if (req.method === 'POST') {
    handlePOST(userId, res, req);
  } else if (req.method === 'DELETE') {
    handleDELETE(userId, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

// GET /api/user/:id
async function handleGET(userId: string, res: NextApiResponse<User>) {
  try {
    const user = (await prisma.user.findUnique({
      where: { id: String(userId) },
    })) as User;
    res.json(exclude(user, ['password']) as User);
  } catch (error) {
    res.status(404).json({ message: 'User not found' });
  }
}

// GET /api/user/:id
async function handlePOST(
  userId: string,
  res: NextApiResponse<User>,
  req: NextApiRequest
) {
  const user = await prisma.user.update({
    where: { id: String(userId) },
    data: { ...req.body },
  });
  return res.json(user);
}

// DELETE /api/user/:id
async function handleDELETE(userId: string, res: NextApiResponse<User>) {
  const user = await prisma.user.delete({
    where: { id: String(userId) },
  });
  res.json(user);
}
