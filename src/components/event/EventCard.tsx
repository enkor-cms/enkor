'use client';

import {
  EventResponseSuccess,
  JoinEventResponseSuccess,
} from '@/features/events';
import { getFirstItem } from '@/lib';
import { formatDate } from '@/lib/tsUtils';
import Link from 'next/link';
import React from 'react';
import {
  Button,
  Card,
  CustomImage,
  Flex,
  ImageHorizontalContainer,
  Text,
} from '../common';
import { JoinEventButton } from './JoinEventButton';

export type TEventCardProps = {
  event: NonNullable<EventResponseSuccess>;
  showImage?: boolean;
};

export const EventCard: React.FC<TEventCardProps> = ({
  event,
  showImage = true,
}) => {
  const [startDay, startHours] = formatDate(new Date(event.start_at)).split(
    '#',
  );

  const [participations, setParticipations] = React.useState<
    JoinEventResponseSuccess[]
  >(event.participations);

  const handleJoinEvent = (participation: JoinEventResponseSuccess) => {
    const newParticipations = [...participations, participation];
    setParticipations(newParticipations);
  };

  return (
    <Card className="w-full">
      <Flex
        fullSize
        direction="column"
        verticalAlign="center"
        gap={0}
        className="divide-y divide-white-300 dark:divide-dark-300"
      >
        {showImage && (
          <Flex
            fullSize
            direction="row"
            verticalAlign="center"
            horizontalAlign="left"
            className="relative rounded-t-md"
          >
            <CustomImage
              src="/hiking.png"
              alt="hiking"
              fullWidth
              height={100}
              rounded="md"
              style={{
                objectFit: 'cover',
                objectPosition: 'top -20px left 50%',
              }}
            />
            <JoinEventButton event={event} onJoinEvent={handleJoinEvent} />
            <Link
              className="absolute top-0 left-0"
              href={`/events/${event.id}`}
              target="_blank"
            >
              <Button text="see event" icon="eye" iconOnly />
            </Link>
          </Flex>
        )}
        <Flex
          fullSize
          direction="row"
          verticalAlign="center"
          horizontalAlign="stretch"
        >
          <Flex
            fullSize
            direction="column"
            verticalAlign="top"
            horizontalAlign="left"
            className="p-2"
            gap={0}
          >
            <Flex direction="row" gap={3} className="opacity-80">
              <Text variant="overline">
                <strong>{startDay.toUpperCase()}</strong>
              </Text>
              <Text variant="overline" color="text-brand-300">
                {startHours}
              </Text>
            </Flex>
            <Text variant="subtitle" color="text-brand-300 dark:text-brand-100">
              {event.name}
            </Text>
          </Flex>
          {!showImage && (
            <Link href={`/events/${event.id}`} target="_blank" className="p-2">
              <Button text="see event" icon="eye" iconOnly />
            </Link>
          )}
        </Flex>
        <Flex
          fullSize
          direction="row"
          verticalAlign="center"
          horizontalAlign="stretch"
          className="p-2"
        >
          {event.creator && (
            <div>
              <Flex direction="row" gap={1}>
                {participations && (
                  <ImageHorizontalContainer
                    images={participations.map((participation) => ({
                      src: getFirstItem(participation?.user)?.avatar_url,
                      alt: getFirstItem(participation?.user)?.username,
                    }))}
                  />
                )}
              </Flex>
              <Text variant="caption" color="text-brand-300">
                {getFirstItem(event.creator).username}
              </Text>
            </div>
          )}
          <Text variant="caption" className="tracking-widest">
            <strong>{participations.length}</strong>
            <span className="opacity-70">/{event.places}</span>
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
};
