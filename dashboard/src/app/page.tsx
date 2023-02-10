import Image from 'next/image';

export default function Page() {
  return (
    <div className="h-screen flex justify-center content-center bg-white-200 dark:bg-dark-100">
      <Image src="/logo.svg" alt="Enkor Logo" width={100} height={100} />
    </div>
  );
}
