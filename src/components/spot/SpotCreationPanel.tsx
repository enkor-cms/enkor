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
import { useDictionary } from '../DictionaryProvider';
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
  const dictionary = useDictionary();
  const supabase = createClient();
  const { session } = useSupabase();

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
    setSubmittingMessage(`${dictionary.spotsCreation.checking_data}...`);

    setErrors({
      name: spotForm.name === '' ? dictionary.common.required_field : undefined,
      difficulty:
        spotForm.difficulty.length == 0
          ? dictionary.common.required_field
          : undefined,
      type:
        spotForm.type.length == 0
          ? dictionary.common.required_field
          : undefined,
      location:
        location === null
          ? dictionary.spotsCreation.must_select_location
          : undefined,
      image:
        images.length == 0 ? dictionary.common.must_select_image : undefined,
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
    setSubmittingMessage(`${dictionary.spotsCreation.uploading_images}...`);
    try {
      const responses = await handleFileUpload(images);
      publicImagesPaths = responses.map((response) => response.publicUrl);
      imagesPaths = responses.map((response) => response.path);
    } catch (error) {
      logger.error(error);
      toast.error(dictionary.spotsCreation.error_uploading_images);
      setSubmittingMessage(undefined);
      return false;
    }

    /*
      CREATE LOCATION
    */
    setSubmittingMessage(`${dictionary.spotsCreation.creating_spot}...`);
    try {
      const locationCreated = await handleLocationCreation(
        location as TLocationInsert,
      );
      if (!locationCreated) {
        throw new Error(dictionary.spotsCreation.error_creating_spot);
      }
      locationId = locationCreated[0].id;
    } catch (error) {
      logger.error(error);
      toast.error(dictionary.spotsCreation.error_creating_spot);
      handleDeleteImages(imagesPaths);
      setSubmittingMessage(undefined);
      return false;
    }

    /*
      CREATE SPOT
    */

    setSubmittingMessage(`${dictionary.spotsCreation.creating_spot}...`);
    try {
      const spotCreated = await handleSpotCreation({
        ...spotForm,
        location: locationId,
        image: publicImagesPaths,
        creator: session?.user?.id as string,
      });
      if (!spotCreated) {
        throw new Error(dictionary.spotsCreation.error_creating_spot);
      }
      onSpotCreated && onSpotCreated(spotCreated[0]);
      setSubmittingMessage(undefined);
      return true;
    } catch (error) {
      logger.error(error);
      toast.error(dictionary.spotsCreation.error_creating_spot);
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
        text={dictionary.spots.create_spot}
        icon="models"
        variant="default"
        onClick={() => openPanel()}
      />

      <FloatingPanel
        isOpen={panelOpen}
        title={dictionary.spots.create_spot}
        onClose={() => {
          closePanel();
          onClose && onClose();
        }}
        size="large"
        onConfirm={async () => {
          openConfirmModal();
        }}
        forceValidation={true}
        forceValidationMessage={dictionary.common.force_validation_message}
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
              {dictionary.common.required_fields}
            </Text>
            <InputText
              labelText={dictionary.spots.spot_name}
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
                labelText={dictionary.common.difficulty}
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
                    {dictionary.spots.difficulty[difficulty]}
                  </option>
                ))}
              </Select>
              <Select
                labelText={dictionary.common.type}
                className="h-full w-full"
                icon="globe-alt"
                value={spotForm.type}
                onChange={(e) =>
                  setSpotForm.type(e.target.value as typeof spotForm.type)
                }
              >
                {Object.values(SPOT_TYPES).map((type) => (
                  <option value={type} key={type}>
                    {dictionary.spots.type[type]}
                  </option>
                ))}
              </Select>
            </Flex>

            <InputImage
              labelText={dictionary.spots.spot_images}
              error={errors.image}
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
              {dictionary.common.optional_fields}
            </Text>
            <InputTextArea
              labelText={dictionary.spots.spot_description}
              type="text"
              value={spotForm.description || ''}
              onChange={(e) =>
                setSpotForm.description &&
                setSpotForm.description(e.target.value)
              }
              className="w-full"
            />
            <InputTextArea
              labelText={dictionary.common.approach}
              type="text"
              value={spotForm.approach || ''}
              onChange={(e) =>
                setSpotForm.approach && setSpotForm.approach(e.target.value)
              }
              className="w-full"
            />
            <Flex className="w-full" direction="row" gap={6}>
              <InputText
                labelText={dictionary.spots.rock_type}
                type="text"
                value={spotForm.rock_type || ''}
                onChange={(e) =>
                  setSpotForm.rock_type && setSpotForm.rock_type(e.target.value)
                }
                className="w-full"
              />
              <InputText
                labelText={`${dictionary.common.cliff_height} (m)`}
                type="number"
                value={spotForm.cliff_height || 0}
                onChange={(e) =>
                  setSpotForm.cliff_height &&
                  setSpotForm.cliff_height(parseInt(e.target.value))
                }
                className="w-full"
              />
              <Select
                labelText={dictionary.common.orientation}
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
              labelText={dictionary.common.practice_period}
              onChange={(selectedItems) => {
                setSpotForm.period && setSpotForm.period(selectedItems);
              }}
              options={Object.values(SPOT_PERIODS).map(
                (period) => dictionary.month[period.toLocaleLowerCase()],
              )}
            />
          </Flex>
        </Flex>
        <Modal
          title={dictionary.common.one_more_step}
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
                message={dictionary.common.must_fill_required_fields}
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
                message={dictionary.common.warning_fill_optional_fields}
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
                message={dictionary.spotsCreation.spots_found_warning}
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
                      {`${dictionary.common.created_at} ${formatDateString(
                        spot.created_at,
                      )}`}
                    </Text>
                    <Link
                      href={`/spot/${spot.id}`}
                      className="opacity-60 hover:opacity-100"
                      target="_blank"
                    >
                      <Text variant="caption" className="opacity-60">
                        {dictionary.common.view}
                      </Text>
                    </Link>
                  </Flex>
                ))}
              </InfoCard>
            )}

            <Text variant="body" className="py-0 px-3">
              {dictionary.common.check_before_submit}
            </Text>
          </Flex>
        </Modal>
      </FloatingPanel>
    </>
  );
}
