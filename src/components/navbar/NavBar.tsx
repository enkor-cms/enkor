'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { useSupabase } from '../auth/SupabaseProvider';
import { Button, Flex, FloatingPanel } from '../common';
import LocaleSwitcher from '../footer/LocaleSwitcher';
import { NavIcon } from './NavIcons';
import { SearchBar } from './SearchBar';

interface INavBarProps {}

export const NavBar: React.FC<INavBarProps> = () => {
  const { session } = useSupabase();
  const router = useRouter();
  const params = useSearchParams();

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
          href={'/'}
          className="w-auto pl-3 gap-2 flex justify-center items-center "
        >
          <Image src="/logo_clear.png" alt="Logo" width={40} height={40} />
        </Link>
      </Flex>
      <Flex className="absolute w-8/12 md:w-1/2 lg:w-1/3 h-full left-1/2 z-30 transform -translate-x-1/2">
        <SearchBar />
      </Flex>
      <Flex
        direction="row"
        className="flex-none md:hidden divide-x divide-white-300 dark:divide-dark-300"
        horizontalAlign="right"
        gap={0}
      >
        {/* Hamburger button */}
        <Button
          variant="primary"
          text="Menu"
          icon="hamburger"
          iconOnly
          className="mr-3 flex-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        />
        <FloatingPanel
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          title={'Settings'}
          onConfirm={function (): void | Promise<void> {
            throw new Error('Function not implemented.');
          }}
          customHeader={
            <Flex
              direction="row"
              verticalAlign="center"
              horizontalAlign="left"
              className="w-full h-16 px-3"
            >
              <Button
                variant="secondary"
                text="Go back"
                icon="chevron-left"
                onClick={() => setMobileMenuOpen(false)}
              />
            </Flex>
          }
          customFooter={<LocaleSwitcher />}
        >
          <Flex className="p-2">
            <Button
              text="Maps"
              className="w-full"
              variant="primary"
              icon="map"
              onClick={() => {
                setMobileMenuOpen(false);
                router.push('/maps');
              }}
            />

            <Button
              text="Models"
              variant="primary"
              className="w-full"
              icon="swatch"
              onClick={() => {
                setMobileMenuOpen(false);
                router.push('/model');
              }}
            />

            <Button
              text="Settings"
              variant="primary"
              className="w-full"
              icon="cog"
              onClick={() => {
                setMobileMenuOpen(false);
                router.push('/settings/user');
              }}
            />
          </Flex>
        </FloatingPanel>
      </Flex>
      <Flex
        direction="row"
        className="hidden md:flex divide-x divide-white-300 dark:divide-dark-300"
        horizontalAlign="right"
        gap={0}
      >
        <Flex className="h-full px-3">
          <NavIcon icon="map" label="map" to="/maps" />
        </Flex>
        <Flex className="h-full px-3">
          <NavIcon icon="swatch" label="models" to="/model" />
        </Flex>
        <Flex className="h-full px-3">
          <NavIcon
            icon="cog"
            label="settings"
            to="/settings/user"
            userImage={
              session ? session.user.user_metadata?.avatar_url : undefined
            }
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
