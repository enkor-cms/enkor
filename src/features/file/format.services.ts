import { FormidableResult } from '@/lib/formidable';
import { logger } from '@/lib/logger';
import mime from 'mime-types';
import { FileFormats, IFileFormat } from './types';

export const extractExtension = (
  data: FormidableResult
): {
  extension: string;
  mimetype?: string;
} => {
  const { files } = data;

  const mimetype = Array.isArray(files.file)
    ? files.file[0].mimetype
    : files.file.mimetype;

  if (mimetype) {
    return {
      extension: mime.extension(mimetype) as string,
      mimetype,
    };
  } else {
    const originalFilename = Array.isArray(files.file)
      ? files.file[0].originalFilename
      : files.file.originalFilename;

    if (!originalFilename) {
      throw new Error('No filename provided');
    }

    const fileExtension = originalFilename.split('.').pop();

    if (!fileExtension) {
      throw new Error('No file extension provided');
    }

    return {
      extension: fileExtension,
    };
  }
};

export const extractFilename = (data: FormidableResult): string => {
  const { fields, files } = data;
  let filename;

  if (fields.name) {
    const filename = Array.isArray(fields.name) ? fields.name[0] : fields.name;
    return formatOriginalFilename(filename);
  }

  if (Array.isArray(files.file)) {
    filename = files.file[0].originalFilename;
  } else {
    filename = files.file.originalFilename;
  }

  if (!filename) {
    throw new Error('No filename provided');
  }

  return formatOriginalFilename(filename);
};

export const formatOriginalFilename = (filename: string): string => {
  const fileExtension = filename.split('.').pop();
  const fileWithoutExtension = filename.replace(`.${fileExtension}`, '');
  const formattedFilename = fileWithoutExtension.replace(/ /g, '_');
  const alphanumericFilename = formattedFilename.replace(/[^a-zA-Z0-9_]/g, '');

  return alphanumericFilename.toLowerCase();
};

export const getFormatNames = (
  filename: string,
  extension: string,
  fileId: string
): Record<IFileFormat, string> => {
  const fileNames: Record<string, string> = {};

  Object.values(FileFormats).forEach((format) => {
    fileNames[format] = `${filename}_${format}_${fileId}.${extension}`;
  });

  logger.debug(`File names: ${fileNames}`);

  return fileNames;
};
