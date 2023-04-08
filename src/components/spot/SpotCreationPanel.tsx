import {
  Button,
  Flex,
  FloatingPanel,
  Icon,
  InfoCard,
  InputImage,
  InputMultipleSelect,
  InputText,
  InputTextArea,
  Select,
  Text,
} from '@/components/common';
import { SPOT_PERIODS } from '@/features/spots';
import {
  SPOT_DIFFICULTIES,
  SPOT_ORIENTATIONS,
  SPOT_TYPES,
} from '@/features/spots/constants';
import useCustomForm from '@/features/spots/hooks';
import { uploadFiles } from '@/features/storage';
import { useToggle } from '@/hooks';
import { Database } from '@/lib/db_types';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/browser';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { InputMaps, TLocationInsert } from '../maps';

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
    description: undefined,
    approach: undefined,
    difficulty: 'Medium',
    rock_type: undefined,
    cliff_height: undefined,
    period: undefined,
    orientation: undefined,
    image: undefined,
    creator: '',
    location: 0,
    type: 'Indoor',
  };

  const [spotForm, setSpotForm, errors, setErrors] =
    useCustomForm(initialState);
  const [location, setLocation] = useState<TLocationInsert | null>(null);
  const [images, setImages] = useState<File[]>([]);

  const handleFileUpload = async (files: File[]) => {
    const imagesPaths = await uploadFiles({
      client: supabase,
      path: 'spots',
      files: files,
    });

    setSpotForm.image &&
      setSpotForm.image(imagesPaths.map((image) => image.publicUrl));

    return imagesPaths;
  };

  const handleSpotCreation = async () => {
    setSubmitting(true);

    setErrors({
      name: spotForm.name === '' ? 'This field is required' : undefined,
      difficulty:
        spotForm.difficulty.length == 0 ? 'This field is required' : undefined,
      type: spotForm.type.length == 0 ? 'This field is required' : undefined,
      location: location === null ? 'You must select a location' : undefined,
      image:
        images.length == 0 ? 'You must select at least one image' : undefined,
    });

    if (
      errors.name ||
      errors.difficulty ||
      errors.type ||
      errors.location ||
      errors.image
    ) {
      setSubmitting(false);
      return false;
    }

    let publicImagesPaths: string[] = [];
    let imagesPaths: string[] = [];
    // create this variable because setState is async and we need to wait for the state to be updated

    /* 
      UPLOAD IMAGES
    */
    try {
      const responses = await handleFileUpload(images);
      publicImagesPaths = responses.map((response) => response.publicUrl);
      imagesPaths = responses.map((response) => response.path);
    } catch (error) {
      logger.error(error);
      toast.error('An error occurred while uploading the images');
      setSubmitting(false);
      return false;
    }

    /*
      CREATE SPOT
    */

    logger.info('Creating spot');
    logger.info({
      ...spotForm,
      publicImagesPaths,
    });
    logger.info(location);

    setSubmitting(false);
    return false;
  };

  const [submitting, setSubmitting] = useState(false);

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
          (await handleSpotCreation()) && closePanel();
        }}
        forceValidation={true}
        forceValidationMessage="If you close the panel, you will lose all the data you have entered. Are you sure you want to close the panel?"
      >
        <Flex
          fullSize
          direction="column"
          horizontalAlign="left"
          gap={0}
          className="divide-y overflow-y-auto divide-white-300 dark:divide-dark-300"
        >
          {submitting && (
            <Flex
              fullSize
              className="absolute inset-0 z-50 bg-white-200 dark:bg-dark-100 bg-opacity-70"
              direction="column"
              horizontalAlign="center"
              verticalAlign="center"
              gap={6}
            >
              <Icon name="spin" className="animate-spin" />
              <Text variant="body">Creating spot...</Text>
            </Flex>
          )}
          <Flex
            className="w-full p-6"
            direction="column"
            horizontalAlign="left"
            verticalAlign="top"
            gap={6}
          >
            <Text variant="body" className="py-0 px-3">
              Required fields
            </Text>
            <InputText
              labelText="Spot name"
              type="text"
              error={errors.name}
              value={spotForm.name}
              onChange={(e) => {
                setSpotForm.name(e.target.value);
                setErrors({ name: undefined });
              }}
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

            <InputImage
              labelText="Spot image"
              onSelectedFilesChange={(images) => {
                setImages(images);
                setErrors({ image: undefined });
              }}
            />

            <Flex className="w-full" direction="column" gap={3}>
              <InputMaps
                onChangeLocation={(location) => {
                  setLocation(location);
                  setErrors({ location: undefined });
                }}
              />
              {errors.location && (
                <InfoCard
                  color="red"
                  icon="warning"
                  message={errors.location}
                />
              )}
            </Flex>
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
              value={spotForm.description || ''}
              onChange={(e) =>
                setSpotForm.description &&
                setSpotForm.description(e.target.value)
              }
              className="w-full"
            />
            <InputTextArea
              labelText="Approach"
              type="text"
              value={spotForm.approach || ''}
              onChange={(e) =>
                setSpotForm.approach && setSpotForm.approach(e.target.value)
              }
              className="w-full"
            />
            <Flex className="w-full" direction="row" gap={6}>
              <InputText
                labelText="Rock type"
                type="text"
                value={spotForm.rock_type || ''}
                onChange={(e) =>
                  setSpotForm.rock_type && setSpotForm.rock_type(e.target.value)
                }
                className="w-full"
              />
              <InputText
                labelText="Cliff height (m)"
                type="number"
                value={spotForm.cliff_height || 0}
                onChange={(e) =>
                  setSpotForm.cliff_height &&
                  setSpotForm.cliff_height(parseInt(e.target.value))
                }
                className="w-full"
              />
              <Select
                labelText="Orientation"
                className="h-full w-full"
                value={spotForm.orientation}
                onChange={(e) =>
                  setSpotForm.orientation &&
                  setSpotForm.orientation(
                    e.target.value as typeof spotForm.orientation,
                  )
                }
              >
                {Object.values(SPOT_ORIENTATIONS).map((orientation) => (
                  <option value={orientation} key={orientation}>
                    {orientation}
                  </option>
                ))}
              </Select>
            </Flex>
            <InputMultipleSelect
              labelText="Period"
              onChange={(selectedItems) => {
                setSpotForm.period && setSpotForm.period(selectedItems);
              }}
              options={Object.values(SPOT_PERIODS).map((period) => period)}
            />
          </Flex>
        </Flex>
      </FloatingPanel>
    </>
  );
}
