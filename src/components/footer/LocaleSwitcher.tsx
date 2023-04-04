'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { i18n } from '../../i18n';
import { Flex } from '../common';
import { useDictionary } from '../DictionaryProvider';

export default function LocaleSwitcher() {
  const pathName = usePathname();
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const dictionary = useDictionary();

  return (
    <Flex direction="row">
      {i18n.locales.map((locale) => {
        return (
          <Link key={locale} href={redirectedPathName(locale)}>
            {dictionary.locales[locale]}
          </Link>
        );
      })}
    </Flex>
  );
}
