import { FormidableResult } from '@/lib/formidable';
import prisma from '@/lib/prisma';
import { File, Prisma } from '@prisma/client';
import { extractExtension, extractFilename } from './format.services';
import { createFile, createImage } from './service';

const list = (): Promise<File[]> => {
  return prisma.file.findMany();
};

const create = async (data: FormidableResult, userId: string) => {
  const filename: string = extractFilename(data);
  const { extension, mimetype } = extractExtension(data);

  const fileValidator = (
    name: string,
    path: string,
    extension: string,
    userId: string
  ) => {
    return Prisma.validator<Prisma.FileCreateInput>()({
      name,
      path,
      extension,
      mimeType: mimetype,
      createdBy: {
        connect: {
          id: userId,
        },
      },
      size: 0,
      formats: '',
    });
  };

  const fileToCreate = fileValidator(filename, '', extension, userId);

  const fileCreated = await prisma.file.create({
    data: fileToCreate,
  });

  if (mimetype && mimetype.startsWith('image/')) {
    return createImage(data, filename, extension, fileCreated.id);
  } else {
    return createFile(data, filename, extension, fileCreated.id);
  }
};

const FileService = {
  list,
  create,
};

export default FileService;
