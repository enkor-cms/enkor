'use client';
import { Text } from '@/components/common/text';

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <Text variant="body">{params.slug}</Text>
    </div>
  );
}
