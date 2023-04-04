import { Card, CustomImage, Flex, Text } from '@/components/common';
import { getDictionary } from '@/lib/get-dictionary';
import { Locale } from '../../i18n';

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <Flex fullSize verticalAlign="center" horizontalAlign="left">
      <Flex className="w-full relative" gap={0}>
        <Flex verticalAlign="center" className="w-full h-full relative">
          <CustomImage
            src="/climber.png"
            alt="Hero"
            height={450}
            width={400}
            loader
            fullWidth
            style={{
              objectFit: 'cover',
            }}
          />
        </Flex>
        <Flex
          verticalAlign="top"
          className="absolute px-4 md:bottom-[20%] md:left-[10%]"
        >
          <CustomImage
            src="/logo.png"
            alt="Hero"
            height={150}
            width={150}
            loader
            style={{
              objectFit: 'contain',
            }}
            className="shadow-xl"
          />
          <Text variant="title" className="text-white-100">
            {dictionary.home.title}
          </Text>
        </Flex>
      </Flex>
      <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-6 container mx-auto px-4 py-4">
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
