import { Card, Flex, Text } from '@/components/common';
import { getDictionary } from '@/lib/get-dictionary';
import { Locale } from '../../i18n';

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <Flex
      fullSize
      verticalAlign="center"
      horizontalAlign="left"
      className="container mx-auto px-4 py-12"
    >
      <Flex className="py-6">
        <Text variant="title" className="text-center">
          {dictionary.home.title}
        </Text>
      </Flex>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(dictionary.home.part).map(([key, value]) => (
          <Card key={key} className="p-6">
            <Text variant="subtitle">{value.title}</Text>
            <Text variant="body">{value.text}</Text>
          </Card>
        ))}
      </div>
    </Flex>
  );
}
