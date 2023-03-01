import {
  Button,
  Flex,
  Icon,
  InputText,
  Modal,
  Tag,
  Text,
} from '@/components/common';
import { fetcher } from '@/lib';
import { Provider } from '@prisma/client';
import { getCsrfToken } from 'next-auth/react';
import React from 'react';
import { IProviderProps } from './types';

export const ProviderBlock: React.FC<IProviderProps> = ({
  icon,
  label,
  value,
  data,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dataState, setDataState] = React.useState<Provider | undefined>(data);
  const [publicKey, setPublicKey] = React.useState('');
  const [secretKey, setSecretKey] = React.useState('');
  const csrfToken = getCsrfToken();

  const handleSubmit = async () => {
    const body = {
      name: value,
      clientId: publicKey,
      clientSecret: secretKey,
    };

    const { status, data: providerCreated } = await fetcher<Provider>({
      url: '/api/providers',
      method: 'POST',
      body: body,
      cookies: [
        {
          name: 'next-auth.csrf-token',
          value: (await csrfToken) as string,
        },
      ],
    });

    if (status === 200) {
      console.log(providerCreated);
      setDataState(providerCreated);
      return true;
    } else {
      return false;
    }
  };

  return (
    <Flex fullSize direction="row" horizontalAlign="stretch" className="p-3">
      <Flex direction="row" horizontalAlign="left">
        <Icon name={icon} scale={2} color="text-gray-500" />
        <Text style="subtitle">{label}</Text>
      </Flex>
      <Flex direction="row" horizontalAlign="left">
        {dataState ? (
          <Tag color="green" text="Enabled" />
        ) : (
          <Button
            title="Enable"
            variant="secondary"
            onClick={() => {
              setIsOpen(true);
            }}
          />
        )}
      </Flex>
      <Modal
        title="Configure provider"
        isOpen={isOpen}
        onClose={function (): void {
          setIsOpen(false);
        }}
        onConfirm={async function (): Promise<void> {
          if (await handleSubmit()) setIsOpen(false);
        }}
      >
        <Flex direction="column" horizontalAlign="left" className="p-3">
          <Text style="body" className="text-left m-2">
            To enable {label} provider you need to provide your public and
            secret key. You can find them in your {label} developer page.
          </Text>
          <InputText
            value={publicKey}
            labelText="Public key"
            onChange={(e) => {
              setPublicKey(e.target.value);
            }}
            className="w-full"
          />
          <InputText
            value={secretKey}
            labelText="Secret key"
            onChange={(e) => {
              setSecretKey(e.target.value);
            }}
            className="w-full"
          />
        </Flex>
      </Modal>
    </Flex>
  );
};
