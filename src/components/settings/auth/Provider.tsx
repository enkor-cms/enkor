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
import { toast } from 'react-toastify';
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
    toast.promise(
      fetcher<Provider>({
        url: '/api/providers',
        method: 'POST',
        body: {
          name: value,
          clientId: publicKey,
          clientSecret: secretKey,
        },
        cookies: [
          {
            name: 'next-auth.csrf-token',
            value: (await csrfToken) as string,
          },
        ],
      }).then(({ data: providerCreated, status }) => {
        if (status === 200) {
          setDataState(providerCreated);
          setIsOpen(false);
          return providerCreated;
        } else {
          return undefined;
        }
      }),
      {
        pending: 'Enabling provider',
        success: `Provider ${label} enabled`,
        error: `Failed to enable provider ${label}`,
      }
    );
  };

  const handleDelete = async () => {
    toast.promise(
      fetcher<Provider>({
        url: `/api/providers/${dataState?.id}`,
        method: 'DELETE',
        cookies: [
          {
            name: 'next-auth.csrf-token',
            value: (await csrfToken) as string,
          },
        ],
      }).then(({ status }) => {
        if (status === 200) {
          setDataState(undefined);
          return true;
        } else {
          return false;
        }
      }),
      {
        pending: 'Disabling provider',
        success: `Provider ${label} disabled`,
        error: `Failed to disable provider ${label}`,
      }
    );
  };

  return (
    <Flex fullSize direction="row" horizontalAlign="stretch" className="p-3">
      <Flex className="w-60" direction="row" horizontalAlign="left">
        <Icon name={icon} scale={1.2} />
        <Text style="subtitle">{label}</Text>
      </Flex>
      {/* {dataState && (
        <Flex direction="row" horizontalAlign="right">
          <Icon name="eye" scale={1.2} />
          <Text style="body" className="text-left m-2 truncate">
            {dataState.clientId}
          </Text>
          <Icon name="eye" scale={1.2} />
          <Text style="body" className="text-left m-2 truncate w-20">
            {dataState.clientSecret}
          </Text>
        </Flex>
      )} */}
      <Flex direction="row" horizontalAlign="left">
        {dataState ? (
          <>
            <Tag color="green" text="Enabled" />
            <Button
              title="Disable"
              icon="cross"
              variant="primary"
              iconOnly
              onClick={() => handleDelete()}
            />
          </>
        ) : (
          <Button
            title="Enable"
            variant="primary"
            onClick={() => setIsOpen(true)}
          />
        )}
      </Flex>
      <Modal
        title="Configure provider"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => handleSubmit()}
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
