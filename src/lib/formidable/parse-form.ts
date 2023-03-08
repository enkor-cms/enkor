import type { Fields, Files } from 'formidable';
import { formidable } from 'formidable';
import type { NextApiRequest } from 'next';

export type FormidableResult = {
  fields: Fields;
  files: Files;
};

export const parseForm = async (
  req: NextApiRequest
): Promise<FormidableResult> => {
  const form = formidable({
    multiples: false,
    keepExtensions: true,
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      } else {
        resolve({ fields, files });
      }
    });
  });
};
