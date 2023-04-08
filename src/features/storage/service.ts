import { v4 as uuidv4 } from 'uuid';

import { logger } from '@supabase/auth-helpers-nextjs';
import { PUBLIC_STORAGE_URL } from './constants';
import {
  deleteFilesParams,
  uploadFileParams,
  uploadFilesParams,
} from './types';

const buildPublicUrl = (bucketName: string, path: string, filename: string) => {
  return `${PUBLIC_STORAGE_URL}${bucketName}/${path}/${filename}`;
};

export const uploadFile = async (params: uploadFileParams) => {
  const { client, path, file } = params;
  const filename = `${uuidv4()}-${file.name}`;
  const { data, error } = await client.storage
    .from('images')
    .upload(`${path}/${filename}`, file, {
      cacheControl: '3600',
      upsert: false,
    });
  if (error) {
    throw new Error(error.message);
  }
  return {
    ...data,
    publicUrl: buildPublicUrl('images', path, filename),
  };
};

export const uploadFiles = async (params: uploadFilesParams) => {
  const { client, path, files } = params;
  const promises = files.map((file) => uploadFile({ client, path, file }));
  const results = await Promise.all(promises);
  return results;
};

export const deleteFiles = async (params: deleteFilesParams) => {
  const { client, files } = params;
  const { data, error } = await client.storage.from('images').remove(files);

  if (error) {
    logger.error(error);
    throw new Error(error.message);
  }

  logger.info(data);
  return data;
};
