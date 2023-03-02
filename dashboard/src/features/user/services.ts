import { logger } from '@/lib/logger';
import prisma from '@/lib/prisma';
import { Prisma, User } from '@prisma/client';
import sha256 from 'crypto-js/sha256';

const hashPassword = (password: string) => {
  return sha256(password).toString();
};

const retrieve = (id: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: {
      id: String(id),
    },
  });
};

const update = async (id: string, user: User): Promise<User> => {
  try {
    return await prisma.user.update({
      where: {
        id: String(id),
      },
      data: user,
    });
  } catch (exception) {
    if (exception instanceof Prisma.PrismaClientValidationError) {
      const errors = exception as Prisma.PrismaClientValidationError;
      return Promise.reject({
        message: 'Validation error',
        errors: errors.message,
      });
    } else {
      logger.error(exception);
      return Promise.reject(exception);
    }
  }
};

const create = async (user: User): Promise<User> => {
  try {
    return await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashPassword(user.password || ''),
      },
    });
  } catch (exception) {
    if (exception instanceof Prisma.PrismaClientValidationError) {
      const errors = exception as Prisma.PrismaClientValidationError;
      return Promise.reject({
        message: 'Validation error',
        errors: errors.message,
      });
    } else {
      logger.error(exception);
      return Promise.reject(exception);
    }
  }
};

const destroy = async (id: string): Promise<User> => {
  try {
    return await prisma.user.delete({
      where: {
        id: String(id),
      },
    });
  } catch (exception) {
    logger.error(exception);
    return Promise.reject(exception);
  }
};

const checkCredentials = async (
  email: string,
  password: string
): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user && password == hashPassword(password)) {
      return Promise.resolve(user);
    } else {
      return Promise.reject('Incorrect credentials');
    }
  } catch (exception) {
    logger.error(exception);
    return Promise.reject(exception);
  }
};

export const UserServices = {
  retrieve,
  create,
  update,
  destroy,
  checkCredentials,
};
