import { logger } from '@/lib/logger';
import prisma from '@/lib/prisma';
import { Prisma, Provider } from '@prisma/client';
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
  res: NextApiResponse<Provider[]>
) {
  try {
    const providers = await prisma.provider.findMany();
    res.status(200).json(providers);
  } catch (error) {
    logger.error('error', error.toString());
    res.status(404).send(error.toString());
  }
}

// POST /api/providers
async function handlePOST(req: NextApiRequest, res: NextApiResponse<Provider>) {
  try {
    const body = JSON.parse(JSON.stringify(req.body));
    const provider = await prisma.provider.create({
      data: createProvider(body.name, body.clientId, body.clientSecret),
    });
    res.status(200).json(provider);
  } catch (exception) {
    // TODO: Handle error with a generic error handler
    if (exception instanceof Prisma.PrismaClientValidationError) {
      const errors = exception as Prisma.PrismaClientValidationError;
      res.status(400).send({
        message: 'Validation error',
        errors: errors.message,
      });
    } else {
      console.error(exception);
      res.status(400).send({
        message: 'Error creating provider',
        errors: exception.message,
      });
    }
  }
}

const createProvider = (
  name: string,
  clientId: string,
  clientSecret: string
) => {
  return Prisma.validator<Prisma.ProviderCreateInput>()({
    name,
    clientId,
    clientSecret,
  });
};
