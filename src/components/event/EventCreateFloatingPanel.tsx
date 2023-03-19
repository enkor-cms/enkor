import {
  Button,
  Flex,
  FloatingPanel,
  InputDate,
  InputText,
  Modal,
  Text,
} from '@/components/common';
import { createEvent } from '@/features/events';
import { getSpot, GetSpotResponseSuccess } from '@/features/spots';
import { useToggle } from '@/hooks';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/browser';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { SearchBar } from '../sidebar/SearchBar';
import { SpotCardSmall } from '../spot';
import { TEventCreateModalProps, TEventInsert } from './types';

export const EventCreateFloatingPanel = ({
  spot,
  creatorId,
  onClose,
  onConfirm,
}: TEventCreateModalProps) => {
  const supabase = createClient();
  const router = useRouter();
  const [spotSelected, setSpotSelected] = useState<GetSpotResponseSuccess>(
    spot || null,
  );

  const [panelOpen, openPanel, closePanel] = useToggle(false);
  const [searchModalOpen, openSearchModal, closeSearchModal] = useToggle(false);

  const [name, setName] = useState('');
  const [startAt, setStartAt] = useState('');
  const [endAt, setEndAt] = useState('');
  const [numberOfPlaces, setNumberOfPlaces] = useState(5);

  const handleCreateEvent = async (event: TEventInsert) => {
    const { event: eventCreated, error } = await createEvent({
      client: supabase,
      event,
    });

    if (error) {
      toast.error("Couldn't create event");
      logger.error(error);
      return;
    }

    if (eventCreated) {
      toast.success('Event created');
      return eventCreated;
    }
  };

  const handleSubmit = async () => {
    if (!spotSelected) {
      toast.error('Spot is required');
      return;
    }

    if (name === '') {
      toast.error('Event name is required');
      return;
    }

    if (startAt === '') {
      toast.error('Start date is required');
      return;
    }

    if (startAt && endAt && new Date(startAt) > new Date(endAt)) {
      toast.error('Start date must be before end date');
      return;
    }

    if (startAt && new Date(startAt) < new Date()) {
      toast.error('Start date must be in the future');
      return;
    }

    const eventCreated = await handleCreateEvent({
      spot_id: spotSelected.id as string,
      creator_id: creatorId,
      name,
      start_at: new Date(startAt).toISOString(),
      end_at: endAt ? new Date(endAt).toISOString() : null,
      places: numberOfPlaces,
    });

    if (eventCreated) {
      onConfirm && onConfirm(eventCreated);
      return eventCreated;
    }
  };

  return (
    <>
      <Button
        text="Create a new event"
        variant="default"
        onClick={() => openPanel()}
      />
      <FloatingPanel
        isOpen={panelOpen}
        text="Create a new event"
        onClose={() => {
          logger.info('Closing panel');
          closePanel();
          onClose && onClose();
        }}
        size="medium"
        onConfirm={async () => {
          const eventCreated = await handleSubmit();
          if (eventCreated) {
            closePanel();
            router.refresh();
          }
        }}
        forceValidation
        forceValidationMessage="If you close the panel, you will lose all the data you have entered. Are you sure you want to close the panel?"
      >
        <Flex
          fullSize
          direction="column"
          horizontalAlign="left"
          gap={0}
          className="divide-y divide-white-300 dark:divide-dark-300"
        >
          <Flex
            className="w-full p-6"
            direction="column"
            horizontalAlign="left"
            verticalAlign="top"
          >
            <Flex
              fullSize
              direction="row"
              horizontalAlign="stretch"
              verticalAlign="center"
            >
              <Text variant="body" className="py-0 px-3">
                Event details
              </Text>
              <Flex
                direction="row"
                horizontalAlign="right"
                verticalAlign="center"
              >
                <Button
                  text="Reset spot"
                  variant="primary"
                  onClick={() => setSpotSelected(spot)}
                />
                <Button
                  text="Change spot"
                  variant="default"
                  icon="loop"
                  onClick={() => openSearchModal()}
                />
              </Flex>
              <Modal
                text="Change spot"
                size="large"
                isOpen={searchModalOpen}
                onClose={() => closeSearchModal()}
                onConfirm={() => {
                  closeSearchModal();
                }}
              >
                <SearchBar
                  onClickItem={async (spotSelected) => {
                    const { spot } = await getSpot({
                      client: supabase,
                      spotId: spotSelected.id as string,
                    });
                    setSpotSelected(spot);
                    closeSearchModal();
                  }}
                />
              </Modal>
            </Flex>
            {spotSelected ? (
              <SpotCardSmall spot={spotSelected} />
            ) : (
              <Flex className="w-full">
                <Text variant="body" className="py-0 px-3 opacity-80">
                  You must select a spot
                </Text>
              </Flex>
            )}
          </Flex>
          <Flex
            className="w-full p-6"
            direction="column"
            horizontalAlign="left"
            gap={6}
          >
            <InputText
              labelText="Event name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
            <InputText
              labelText="Number of participants"
              type="number"
              value={numberOfPlaces}
              onChange={(e) => setNumberOfPlaces(Number(e.target.value))}
              className="w-full"
            />
            <InputDate
              labelText="Start date"
              type="datetime-local"
              value={startAt}
              onChange={(e) => setStartAt(e.target.value)}
              className="w-full"
            />
          </Flex>
          <Flex
            fullSize
            className="p-6"
            direction="column"
            horizontalAlign="left"
            verticalAlign="top"
            gap={6}
          >
            <Text variant="body" className="py-0 px-3">
              Optional fields
            </Text>
            <InputDate
              labelText="End date"
              type="datetime-local"
              value={endAt}
              onChange={(e) => setEndAt(e.target.value)}
              className="w-full"
            />
          </Flex>
        </Flex>
      </FloatingPanel>
    </>
  );
};
