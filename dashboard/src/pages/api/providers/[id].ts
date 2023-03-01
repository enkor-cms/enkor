import { logger } from '@/lib/logger';
import prisma from '@/lib/prisma';
import { Provider } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const methods = {
  GET: handleGET,
  DELETE: handleDELETE,
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = methods[req.method as keyof typeof methods];
  const providerId = req.query.id as string;
  if (method) {
    method(req, res, providerId);
  } else {
    res.setHeader('Allow', Object.keys(methods));
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// GET /api/providers
async function handleGET(
  req: NextApiRequest,
  res: NextApiResponse<Provider>,
  id: string
) {
  try {
    const provider = await prisma.provider.findUnique({
      where: {
        id: String(id),
      },
    });
    res.status(200).json(provider as Provider);
  } catch (error) {
    res.status(404).send(error);
  }
}

// DELETE /api/providers
async function handleDELETE(
  req: NextApiRequest,
  res: NextApiResponse<Provider>,
  id: string
) {
  try {
    const provider = await prisma.provider.delete({
      where: {
        id: String(id),
      },
    });
    res.status(200).json(provider);
  } catch (error) {
    logger.error('error', error.toString());
    res.status(404).send(error.toString());
  }
}
