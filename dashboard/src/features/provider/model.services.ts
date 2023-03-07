import { logger } from '@/lib/logger';
import prisma from '@/lib/prisma';
import { Prisma, Provider } from '@prisma/client';
import { providersAvailable } from './types';

const list = (): Promise<Provider[]> => {
  return prisma.provider.findMany();
};

const retrieve = (id: string): Promise<Provider | null> => {
  return prisma.provider.findUnique({
    where: {
      id: String(id),
    },
  });
};

const create = async (provider: Omit<Provider, 'id'>): Promise<Provider> => {
  try {
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

    // check if provider.name is in enum ProviderType
    if (!Object.values(providersAvailable).includes(provider.name)) {
      return Promise.reject({
        message: 'Validation error',
        errors: `Provider name must be one of ${Object.values(
          providersAvailable
        )}`,
      });
    }

    return await prisma.provider.create({
      data: createProvider(
        provider.name,
        provider.clientId,
        provider.clientSecret
      ),
    });
  } catch (exception) {
    if (exception instanceof Prisma.PrismaClientValidationError) {
      const errors = exception as Prisma.PrismaClientValidationError;
      return Promise.reject({
        message: 'Validation error',
        errors: errors.message,
      });
    } else {
      console.error(exception);
      return Promise.reject(exception);
    }
  }
};

const destroy = async (id: string): Promise<Provider> => {
  try {
    return prisma.provider.delete({
      where: {
        id: String(id),
      },
    });
  } catch (error) {
    logger.error('error', error);
    return Promise.reject(error);
  }
};

export const ProviderService = {
  list,
  retrieve,
  create,
  destroy,
};
