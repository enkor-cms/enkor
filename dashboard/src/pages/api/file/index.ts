import FileService from '@/features/file/model.services';
import { parseForm } from '@/lib/formidable';
import { logger } from '@/lib/logger';
import { File } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

const methods = {
  GET: handleGET,
  POST: handlePOST,
  // DELETE: handleDELETE,
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

// GET /api/files
async function handleGET(req: NextApiRequest, res: NextApiResponse<File[]>) {
  try {
    const files = await FileService.list();
    res.status(200).json(files);
  } catch (error) {
    logger.error('error', error);
    res.status(404).send(error as string);
  }
}

// POST /api/files
async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      res.status(401).send('Unauthorized');
      return;
    }

    const { fields, files } = await parseForm(req);
    const fileNames = await FileService.create(
      { fields, files },
      session?.user?.id
    );
    res.status(200).json(fileNames);
  } catch (error) {
    if (error) {
      res.status(400).send(error.message);
    } else {
      logger.error('error', error);
      res.status(500).send(error as string);
    }
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
