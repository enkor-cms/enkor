'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useSupabase } from '../auth/SupabaseProvider';
import { Button, Card, Flex } from '../common';
import { NavIcon } from './NavIcons';
import { SearchBar } from './SearchBar';

interface INavBarProps {}

export const NavBar: React.FC<INavBarProps> = () => {
  const { session } = useSupabase();
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Flex
      direction="row"
      verticalAlign="center"
      horizontalAlign="stretch"
      className="relative w-full h-16 bg-white-100 dark:bg-dark-200 border-y border-white-300 dark:border-dark-300 "
    >
      <Flex
        direction="row"
        className="flex h-full divide-x divide-white-300 dark:divide-dark-300"
        horizontalAlign="left"
        gap={0}
      >
        <Link
          href={'/dashboard'}
          className="w-auto pl-3 gap-2 flex justify-center items-center "
        >
          <Image src="/logo_clear.png" alt="Logo" width={40} height={40} />
        </Link>
      </Flex>
      <Flex className="w-full md:w-1/2 lg:w-1/3 h-full">
        <SearchBar
          onClickItem={(item) => router.push(`/dashboard/spot/${item.id}`)}
        />
      </Flex>
      <Flex
        direction="row"
        className="flex-none md:hidden divide-x divide-white-300 dark:divide-dark-300"
        horizontalAlign="right"
        gap={0}
      >
        {/* Hamburger button */}
        <Button
          title="Menu"
          icon="hamburger"
          iconOnly
          className="flex-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        />
        {mobileMenuOpen && (
          <Card className="absolute z-40 top-[4.2rem] left-1 right-1">
            <Flex
              direction="column"
              className="divide-y w-full divide-white-300 dark:divide-dark-300"
              horizontalAlign="right"
              gap={0}
            >
              <Button
                title="Maps"
                className="w-full text-brand-300 dark:text-brand-100 "
                variant="none"
                icon="map"
                onClick={() => {
                  setMobileMenuOpen(false);
                  router.push('/dashboard/maps');
                }}
              />

              <Button
                title="Models"
                className="w-full text-brand-300 dark:text-brand-100 "
                variant="none"
                icon="swatch"
                onClick={() => {
                  setMobileMenuOpen(false);
                  router.push('/dashboard/model');
                }}
              />

              <Button
                title="Settings"
                className="w-full text-brand-300 dark:text-brand-100 "
                variant="none"
                icon="cog"
                onClick={() => {
                  setMobileMenuOpen(false);
                  router.push('/dashboard/settings/user');
                }}
              />
            </Flex>
          </Card>
        )}
      </Flex>
      <Flex
        direction="row"
        className="hidden md:flex divide-x divide-white-300 dark:divide-dark-300"
        horizontalAlign="right"
        gap={0}
      >
        <Flex className="h-full px-3">
          <NavIcon icon="map" label="map" to="/dashboard/maps" />
        </Flex>
        <Flex className="h-full px-3">
          <NavIcon icon="swatch" label="models" to="/dashboard/model" />
        </Flex>
        <Flex className="h-full px-3">
          <NavIcon
            icon="cog"
            label="settings"
            to="/dashboard/settings/user"
            userImage={
              session ? session.user.user_metadata?.avatar_url : undefined
            }
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
