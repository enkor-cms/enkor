import Link from 'next/link';
import React from 'react';
import { Icon, IconNames } from '../common';
import { Flex } from '../common/layout';
import { Text } from '../common/text';

export interface IMenuItemsProps {
  icon: IconNames;
  label: string;
  to: string;
}

interface ISideMenuProps {
  menuItems: IMenuItemsProps[];
}

export const SideMenu: React.FC<ISideMenuProps> = ({ menuItems }) => {
  return (
    <Flex className="w-40" horizontalAlign="left" verticalAlign="top">
      {menuItems.map((item) => (
        <Link
          href={item.to}
          key={item.label}
          className="w-full cursor-pointer border-l-2 hover:border-brand-500 border-white-300 dark:border-dark-300"
        >
          <Flex
            direction="row"
            gap={1}
            fullSize
            horizontalAlign="left"
            className="pl-1"
          >
            <Icon name={item.icon} />
            <Text key={item.label} variant="body">
              {item.label}
            </Text>
          </Flex>
        </Link>
      ))}
    </Flex>
  );
};
