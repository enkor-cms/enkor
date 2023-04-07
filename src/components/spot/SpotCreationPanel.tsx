import {
  Button,
  Flex,
  FloatingPanel,
  InputText,
  InputTextArea,
  Select,
  Text,
} from '@/components/common';
import { SPOT_DIFFICULTIES, SPOT_TYPES } from '@/features/spots/constants';
import useCustomForm from '@/features/spots/hooks';
import { useToggle } from '@/hooks';
import { Database } from '@/lib/db_types';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/browser';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { InputMaps } from '../maps';

export type SpotCreationPanelProps = {
  onSpotCreated?: (spot: Spot) => void;
  onClose?: () => void;
};

export function SpotCreationPanel({
  onSpotCreated,
  onClose,
}: SpotCreationPanelProps) {
  const supabase = createClient();
  const router = useRouter();

  const [panelOpen, openPanel, closePanel] = useToggle(true);

  const initialState: Database['public']['Tables']['spots']['Insert'] = {
    name: '',
    description: null,
    approach: null,
    difficulty: 'Medium',
    rock_type: null,
    cliff_height: null,
    period: null,
    orientation: null,
    image: null,
    creator: '',
    location: 0,
    type: 'Indoor',
  };

  const [spotForm, setSpotForm] = useCustomForm(initialState);

  useEffect(() => {
    logger.info(spotForm);
  }, [spotForm]);

  return (
    <>
      <Button
        text="Create a new spot"
        icon="models"
        variant="default"
        onClick={() => openPanel()}
      />
      <FloatingPanel
        isOpen={panelOpen}
        title="Create a new event"
        onClose={() => {
          logger.info('Closing panel');
          closePanel();
          onClose && onClose();
        }}
        size="large"
        onConfirm={async () => {
          // TODO: Create spot
          logger.info('Creating spot');
          closePanel();
        }}
        forceValidationMessage="If you close the panel, you will lose all the data you have entered. Are you sure you want to close the panel?"
      >
        <Flex
          fullSize
          direction="column"
          horizontalAlign="left"
          gap={0}
          className="divide-y overflow-y-auto divide-white-300 dark:divide-dark-300"
        >
          <Flex
            fullSize
            className="p-6"
            direction="column"
            horizontalAlign="left"
            gap={6}
          >
            <InputText
              labelText="Spot name"
              type="text"
              value={spotForm.name}
              onChange={(e) => setSpotForm.name(e.target.value)}
              className="w-full"
            />
            <Flex className="w-full" direction="row" gap={6}>
              <Select
                labelText="Difficulty"
                className="h-full w-full"
                icon="chart"
                value={spotForm.difficulty}
                onChange={(e) =>
                  setSpotForm.difficulty(
                    e.target.value as typeof spotForm.difficulty,
                  )
                }
              >
                {Object.values(SPOT_DIFFICULTIES).map((difficulty) => (
                  <option value={difficulty} key={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </Select>
              <Select
                labelText="Type"
                className="h-full w-full"
                icon="globe-alt"
                value={spotForm.type}
                onChange={(e) =>
                  setSpotForm.type(e.target.value as typeof spotForm.type)
                }
              >
                {Object.values(SPOT_TYPES).map((type) => (
                  <option value={type} key={type}>
                    {type}
                  </option>
                ))}
              </Select>
            </Flex>

            <InputMaps
              onChangeLocation={(location) => {
                // logger.info(location);
              }}
            />
          </Flex>
          <Flex
            className="w-full p-6"
            direction="column"
            horizontalAlign="left"
            verticalAlign="top"
            gap={6}
          >
            <Text variant="body" className="py-0 px-3">
              Optional fields
            </Text>
            <InputTextArea
              labelText="Description"
              type="text"
              value={spotForm.description}
              onChange={(e) => setSpotForm.description(e.target.value)}
              className="w-full"
            />
            <InputTextArea
              labelText="Approach"
              type="text"
              value={spotForm.approach}
              onChange={(e) => setSpotForm.approach(e.target.value)}
              className="w-full"
            />
          </Flex>
        </Flex>
      </FloatingPanel>
    </>
  );
}
