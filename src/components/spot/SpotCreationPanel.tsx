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
  Modal,
  Select,
  Text,
} from '@/components/common';
import { TLocationInsert, insertLocation } from '@/features/locations';
import {
  SPOT_PERIODS,
  TSpot,
  TSpotInsert,
  insertSpot,
  spotsSearchWithBoundsResponseSuccess,
} from '@/features/spots';
import {
  SPOT_DIFFICULTIES,
  SPOT_ORIENTATIONS,
  SPOT_TYPES,
} from '@/features/spots/constants';
import useCustomForm from '@/features/spots/hooks';
import { deleteFiles, uploadFiles } from '@/features/storage';
import { useToggle } from '@/hooks';
import { formatDateString } from '@/lib';
import { Database } from '@/lib/db_types';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/browser';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useSupabase } from '../auth/SupabaseProvider';
import { InputMaps } from '../maps';

export type SpotCreationPanelProps = {
  onSpotCreated?: (spot: TSpot) => void;
  onClose?: () => void;
};

export function SpotCreationPanel({
  onSpotCreated,
  onClose,
}: SpotCreationPanelProps) {
  const supabase = createClient();
  const { session } = useSupabase();

  const [panelOpen, openPanel, closePanel] = useToggle(false);

  const initialState: Database['public']['Tables']['spots']['Insert'] = {
    name: '',
    description: undefined,
    approach: undefined,
    difficulty: 'Medium',
    rock_type: undefined,
    cliff_height: undefined,
    period: undefined,
    orientation: undefined,
    image: [],
    creator: '',
    location: 0,
    type: 'Indoor',
  };

  const [spotForm, setSpotForm, errors, setErrors] =
    useCustomForm(initialState);
  const [location, setLocation] = useState<TLocationInsert | null>(null);
  const [spotsCloseToLocation, setSpotsCloseToLocation] =
    useState<spotsSearchWithBoundsResponseSuccess>();
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

  const handleLocationCreation = async (location: TLocationInsert) => {
    const { location: locationCreated, error } = await insertLocation({
      client: supabase,
      location: location,
    });

    if (error) {
      throw new Error(error.message);
    }

    return locationCreated;
  };

  const handleSpotCreation = async (spot: TSpotInsert) => {
    const { spot: spotCreated, error } = await insertSpot({
      client: supabase,
      spot: spot,
    });

    if (error) {
      throw new Error(error.message);
    }

    return spotCreated;
  };

  const handleDeleteImages = async (imagesPaths: string[]) => {
    const response = await deleteFiles({
      client: supabase,
      files: imagesPaths,
    });

    return response;
  };

  const handleSubmit = async () => {
    setSubmittingMessage('Checking the data...');

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
      spotForm.name === '' ||
      spotForm.difficulty.length == 0 ||
      spotForm.type.length == 0 ||
      location === null ||
      images.length == 0
    ) {
      setSubmittingMessage(undefined);
      return false;
    }

    let publicImagesPaths: string[] = [];
    let imagesPaths: string[] = [];
    let locationId: number = 0;
    // create this variable because setState is async and we need to wait for the state to be updated

    /* 
      UPLOAD IMAGES
    */
    setSubmittingMessage('Uploading images...');
    try {
      const responses = await handleFileUpload(images);
      publicImagesPaths = responses.map((response) => response.publicUrl);
      imagesPaths = responses.map((response) => response.path);
    } catch (error) {
      logger.error(error);
      toast.error('An error occurred while uploading the images');
      setSubmittingMessage(undefined);
      return false;
    }

    /*
      CREATE LOCATION
    */
    setSubmittingMessage('Creating location...');
    try {
      const locationCreated = await handleLocationCreation(
        location as TLocationInsert,
      );
      if (!locationCreated) {
        throw new Error('An error occurred while creating the location');
      }
      locationId = locationCreated[0].id;
    } catch (error) {
      logger.error(error);
      toast.error('An error occurred while creating the location');
      handleDeleteImages(imagesPaths);
      setSubmittingMessage(undefined);
      return false;
    }

    /*
      CREATE SPOT
    */

    setSubmittingMessage('Creating spot...');
    try {
      const spotCreated = await handleSpotCreation({
        ...spotForm,
        location: locationId,
        image: publicImagesPaths,
        creator: session?.user?.id as string,
      });
      if (!spotCreated) {
        throw new Error('An error occurred while creating the spot');
      }
      onSpotCreated && onSpotCreated(spotCreated[0]);
      setSubmittingMessage(undefined);
      return true;
    } catch (error) {
      logger.error(error);
      toast.error('An error occurred while creating the spot');
      handleDeleteImages(imagesPaths);
      setSubmittingMessage(undefined);
      return false;
    }
  };

  const [submittingMessage, setSubmittingMessage] = useState<
    string | undefined
  >(undefined);

  const [confirmModalOpen, openConfirmModal, closeConfirmModal] =
    useToggle(false);

  const allOptionalFieldsFilled = useMemo(() => {
    const optionalFields = [
      spotForm.description,
      spotForm.approach,
      spotForm.rock_type,
      spotForm.cliff_height,
      spotForm.period,
      spotForm.orientation,
    ];

    return optionalFields.every((field) => field !== undefined);
  }, [spotForm]);

  const allRequiredFieldsFilled = useMemo(() => {
    const requiredFields = [
      spotForm.name !== '',
      spotForm.difficulty !== null,
      spotForm.type !== null,
      location !== null,
      images !== null,
    ];

    return requiredFields.every((field) => field === true);
  }, [spotForm, location, images]);

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
          closePanel();
          onClose && onClose();
        }}
        size="large"
        onConfirm={async () => {
          openConfirmModal();
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
          {submittingMessage && (
            <Flex
              fullSize
              className="absolute inset-0 z-50 bg-white-200 dark:bg-dark-100 bg-opacity-70"
              direction="column"
              horizontalAlign="center"
              verticalAlign="center"
              gap={6}
            >
              <Icon name="spin" className="animate-spin" />
              <Text variant="body">{submittingMessage}</Text>
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
                onSpotsFound={(spots) => {
                  setSpotsCloseToLocation(spots);
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
                  setSpotForm.orientation([e.target.value])
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
        <Modal
          title="One more step before submitting"
          isOpen={confirmModalOpen}
          size="xlarge"
          fullHeight
          onClose={() => closeConfirmModal()}
          onConfirm={async () => {
            closeConfirmModal();
            (await handleSubmit()) && closePanel();
          }}
        >
          <Flex className="w-full p-3" horizontalAlign="left">
            {!allRequiredFieldsFilled && (
              <InfoCard
                message="You have not filled all the required fields"
                color="red"
                icon="warning"
              >
                {Object.entries({
                  name: spotForm.name,
                  difficulty: spotForm.difficulty,
                  type: spotForm.type,
                  location: location,
                  image: images,
                }).map(([key, value]) => {
                  if (
                    value === undefined ||
                    value === '' ||
                    value?.length === 0 ||
                    value === null
                  ) {
                    return (
                      <Text variant="caption" key={key} className="opacity-60">
                        {key}
                      </Text>
                    );
                  }
                })}
              </InfoCard>
            )}
            {!allOptionalFieldsFilled && (
              <InfoCard
                message="You have not filled all the optional fields, please fill them to help other climbers"
                color="warning"
                icon="warning"
              >
                {Object.entries(spotForm).map(([key, value]) => {
                  if (value === undefined) {
                    return (
                      <Text variant="caption" key={key} className="opacity-60">
                        {key}
                      </Text>
                    );
                  }
                })}
              </InfoCard>
            )}
            {spotsCloseToLocation && spotsCloseToLocation.length > 0 && (
              <InfoCard
                message="Be careful, there are already spots in this area, please check if your spot is not already in the list"
                color="warning"
                icon="warning"
              >
                {spotsCloseToLocation.map((spot) => (
                  <Flex
                    direction="row"
                    gap={2}
                    verticalAlign="center"
                    horizontalAlign="left"
                    key={spot.name}
                  >
                    <Text variant="caption" className="opacity-90">
                      {spot.name}
                    </Text>
                    <Text variant="caption" className="opacity-60">
                      {`created on ${formatDateString(spot.created_at)}`}
                    </Text>
                    <Link
                      href={`/spot/${spot.id}`}
                      className="opacity-60 hover:opacity-100"
                      target="_blank"
                    >
                      <Text variant="caption" className="opacity-60">
                        {'View'}
                      </Text>
                    </Link>
                  </Flex>
                ))}
              </InfoCard>
            )}

            <Text variant="body" className="py-0 px-3">
              Please check that all the information you have entered is correct
              before submitting
            </Text>
          </Flex>
        </Modal>
      </FloatingPanel>
    </>
  );
}
