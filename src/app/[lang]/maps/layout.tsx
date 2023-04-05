import { ReactNode, Suspense } from 'react';
import Loading from './loading';

interface IProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: IProps) {
  return (
    <div className="relative h-full w-full">
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
