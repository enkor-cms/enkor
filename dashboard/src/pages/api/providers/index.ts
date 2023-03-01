import { ProviderService } from '@/features/provider';
import { logger } from '@/lib/logger';
import { checkSession } from '@/lib/nextAuth';
import { Provider } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const methods = {
  GET: handleGET,
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

// GET /api/providers
async function handleGET(
  req: NextApiRequest,
  res: NextApiResponse<Provider[] | string>
) {
  try {
    const providers = await ProviderService.list();
    res.status(200).json(providers);
  } catch (error) {
    logger.error('error', error);
    res.status(404).send(error as string);
  }
}

// POST /api/providers
async function handlePOST(
  req: NextApiRequest,
  res: NextApiResponse<Provider | string>
) {
  try {
    // check if user is authenticated
    const authorized = await checkSession(req, res);
    if (!authorized) {
      res.status(401).send('Unauthorized');
      return;
    }
    const body = JSON.parse(req.body);
    const provider = await ProviderService.create({
      name: body.name,
      clientId: body.clientId,
      clientSecret: body.clientSecret,
    });
    res.status(200).json(provider);
  } catch (exception) {
    res.status(400).send(exception as string);
    // TODO handle error properly
  }
}
