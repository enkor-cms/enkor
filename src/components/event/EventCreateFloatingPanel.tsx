import {
  Button,
  Flex,
  FloatingPanel,
  InputDate,
  InputText,
  Text,
} from '@/components/common';
import { createEvent } from '@/features/events';
import { useToggle } from '@/hooks';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/browser';
import { useState } from 'react';
import { toast } from 'react-toastify';
import NumberSelector from '../common/input/NumberSelector';
import { SpotCardSmall } from '../spot';
import { TEventCreateModalProps, TEventInsert } from './types';

export const EventCreateFloatingPanel = ({
  spot,
  spotId,
  creatorId,
  onClose,
  onConfirm,
}: TEventCreateModalProps) => {
  const supabase = createClient();

  const [panelOpen, openPanel, closePanel] = useToggle(true);

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
      toast.error("Couldn't create review");
      logger.error(error);
      return;
    }

    if (eventCreated) {
      toast.success('Event created');
      return eventCreated;
    }
  };

  const handleSubmit = async () => {
    if (name === '') {
      toast.error('Title must not be empty');
      return;
    }

    const eventCreated = await handleCreateEvent({
      spot_id: spotId,
      creator_id: creatorId,
      name,
      start_at: startAt,
      end_at: endAt,
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
        title="Create a new event"
        variant="default"
        onClick={() => openPanel()}
      />
      <FloatingPanel
        isOpen={panelOpen}
        title="Create a new event"
        onClose={() => {
          closePanel();
          onClose && onClose();
        }}
        size="medium"
        onConfirm={async () => {
          const eventCreated = await handleSubmit();
          eventCreated && closePanel();
        }}
      >
        <Flex
          fullSize
          direction="column"
          horizontalAlign="left"
          gap={0}
          className="divide-y divide-white-300 dark:divide-dark-300"
        >
          <Flex
            fullSize
            className="p-6"
            direction="column"
            horizontalAlign="left"
            verticalAlign="top"
          >
            <Text style="body" className="py-0 px-3">
              Event details
            </Text>
            <SpotCardSmall spot={spot} />
          </Flex>
          <Flex
            className="w-full p-6"
            direction="column"
            horizontalAlign="left"
            gap={6}
          >
            <NumberSelector
              maxNumber={10}
              value={numberOfPlaces}
              setValue={(value) => {
                setNumberOfPlaces(value);
              }}
            />
            <InputText
              labelText="Event name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
            <InputDate
              labelText="Start date"
              type="date"
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
            <Text style="body" className="py-0 px-3">
              Optional fields
            </Text>
            <InputDate
              labelText="End date"
              type="date"
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
