import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { FileSizes, IFileFormat } from './types';

interface IFileUpload {
  tempPath: string;
  destinationPath: string;
  filename: string;
  variant: IFileFormat;
}

export const generateImageFromOriginal = async ({
  tempPath,
  destinationPath,
  filename,
  variant,
}: IFileUpload) => {
  const size = FileSizes[variant];

  if (variant === 'original') {
    return sharp(tempPath).toFile(path.join(destinationPath, `${filename}`));
  }

  const file = await sharp(tempPath)
    .resize({
      width: size,
    })
    .toFile(path.join(destinationPath, `${filename}`));

  return file;
};

export const generateFile = async ({
  tempPath,
  destinationPath,
  filename,
}: Omit<IFileUpload, 'variant'>) => {
  await fs.copyFile(tempPath, path.join(destinationPath, `${filename}`));
};
