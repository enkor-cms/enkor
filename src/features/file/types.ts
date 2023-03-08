export const FileFormats = {
  thumbnail: 'thumbnail',
  small: 'small',
  medium: 'medium',
  large: 'large',
  original: 'original',
};

export type IFileFormat = keyof typeof FileFormats;

export const FileSizes = {
  thumbnail: 245,
  small: 500,
  medium: 750,
  large: 1000,
  original: 0,
};

export type IFormat = Record<
  IFileFormat,
  {
    name: string;
    path: string;
    extension: string;
    size: number;
    width: number;
    height: number;
  }
>;
