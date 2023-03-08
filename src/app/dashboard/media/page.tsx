import { fetcher } from '@/lib';
import { File } from '@prisma/client';
import { cookies } from 'next/headers';
import Image from 'next/image';

export default async function Page() {
  const { status, data: files } = await fetcher<File[]>({
    url: '/api/file',
    method: 'GET',
    cookies: cookies().getAll(),
  });

  if (status === 404) {
    return <div>404</div>;
  }

  return (
    <div>
      {files &&
        files.map((file) => (
          <div key={file.id}>
            <Image
              src={`/${file.path}`}
              alt={file.name}
              width={150}
              height={150}
            />
          </div>
        ))}
    </div>
  );
}
