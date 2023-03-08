import { FormidableResult } from '@/lib/formidable';
import prisma from '@/lib/prisma';
import path from 'path';
import { getFormatNames } from './format.services';
import { IFileFormat, IFormat } from './types';
import { generateFile, generateImageFromOriginal } from './upload.services';

export const createImage = async (
  data: FormidableResult,
  filename: string,
  extension: string,
  fileDatabaseObjectId: string
) => {
  const formatNames = getFormatNames(filename, extension, fileDatabaseObjectId);
  const tempPath = Array.isArray(data.files.file)
    ? data.files.file[0].filepath
    : data.files.file.filepath;

  const formats: IFormat = {} as IFormat;
  await Promise.all(
    Object.entries(formatNames).map(async ([format, filename]) => {
      const info = await generateImageFromOriginal({
        tempPath,
        destinationPath: path.join(process.cwd(), 'public', 'uploads'),
        filename: filename,
        variant: format as IFileFormat,
      });
      formats[format as IFileFormat] = {
        name: filename,
        path: path.join('uploads', filename),
        extension: info.format,
        size: info.size,
        width: info.width,
        height: info.height,
      };
    })
  );

  const fileUpdated = await prisma.file.update({
    where: {
      id: fileDatabaseObjectId,
    },
    data: {
      formats: formats,
      path: formats['original'].path,
      size: formats['original'].size,
    },
  });

  return fileUpdated;
};

export const createFile = async (
  data: FormidableResult,
  filename: string,
  extension: string,
  fileDatabaseObjectId: string
) => {
  const tempPath = Array.isArray(data.files.file)
    ? data.files.file[0].filepath
    : data.files.file.filepath;
  const newFilename = `${filename}_${fileDatabaseObjectId}.${extension}`;

  await generateFile({
    tempPath,
    destinationPath: path.join(process.cwd(), 'public', 'uploads'),
    filename: newFilename,
  });

  const fileUpdated = await prisma.file.update({
    where: {
      id: fileDatabaseObjectId,
    },
    data: {
      path: path.join('uploads', newFilename),
      size: Array.isArray(data.files.file)
        ? data.files.file[0].size
        : data.files.file.size,
    },
  });

  return fileUpdated;
};
