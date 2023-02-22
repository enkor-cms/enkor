import { Text } from '@/components/common/text';

export default function Page({ params }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <Text style="title">{params.slug}</Text>
    </div>
  );
}
