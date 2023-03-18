import { EventResponseSuccess } from '@/features/events';
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

export const EventCard: React.FC<{
  event: NonNullable<EventResponseSuccess>;
}> = ({ event }) => {
  const [startDay, startHours] = formatDate(new Date(event.start_at)).split(
    '#'
  );

  return (
    <Card>
      <Flex
        fullSize
        direction="column"
        verticalAlign="center"
        gap={0}
        className="divide-y divide-white-300 dark:divide-dark-300"
      >
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
          <JoinEventButton event={event} />
          <Link
            className="absolute top-0 left-0 w-full h-full"
            href={`/events/${event.id}`}
            target="_blank"
          >
            <Button title="see event" icon="eye" iconOnly />
          </Link>
        </Flex>
        <Flex
          fullSize
          direction="column"
          verticalAlign="top"
          horizontalAlign="left"
          className="p-2"
          gap={0}
        >
          <Flex direction="row" gap={3} className="opacity-80">
            <Text style="overline">
              <strong>{startDay.toUpperCase()}</strong>
            </Text>
            <Text style="overline" color="text-brand-300">
              {startHours}
            </Text>
          </Flex>
          <Text style="subtitle" color="text-brand-300 dark:text-brand-100">
            {event.name}
          </Text>
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
                {event.participations &&
                  Array.isArray(event.participations) && (
                    <ImageHorizontalContainer
                      images={event.participations.map((participation) => ({
                        src: getFirstItem(participation.user)?.avatar_url,
                        alt: getFirstItem(participation.user)?.username,
                      }))}
                    />
                  )}
              </Flex>
              <Text style="caption" color="text-brand-300">
                {getFirstItem(event.creator).username}
              </Text>
            </div>
          )}
          <Text style="caption" className="tracking-widest">
            <strong>{event.participations.length}</strong>
            <span className="opacity-70">/{event.places}</span>
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
};
