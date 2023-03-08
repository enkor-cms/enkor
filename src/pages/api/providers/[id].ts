import { ProviderService } from '@/features/provider';
import { logger } from '@/lib/logger';
import { checkSession } from '@/lib/nextAuth';
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
    const provider = await ProviderService.retrieve(id);
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
    const authorized = await checkSession(req, res);
    if (!authorized) {
      res.status(401).send('Unauthorized');
      return;
    }

    const provider = await ProviderService.destroy(id);
    res.status(200).json(provider);
  } catch (error) {
    logger.error('error', error);
    res.status(404).send(error);
  }
}
