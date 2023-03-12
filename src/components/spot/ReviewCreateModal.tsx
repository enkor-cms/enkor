import { InputText, Modal } from '@/components/common';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/browser';
import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  TReviewCreateModalProps,
  TReviewInsert,
  TReviewWithCreator,
} from './types';

export const ReviewCreateModal = ({
  spotId,
  creatorId,
  isOpen,
  onClose,
  onConfirm,
}: TReviewCreateModalProps) => {
  const supabase = createClient();

  const [note, setNote] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleCreateReview = async (review: TReviewInsert) => {
    const { data: newReview, error } = await supabase
      .from('review')
      .insert(review)
      .select('*, creator:profiles(avatar_url)')
      .single();

    if (error) {
      toast.error("Couldn't create review");
      logger.error(error);
      return;
    }

    if (newReview) {
      toast.success('Review created');
      return newReview;
    }
  };

  const handleSubmit = async () => {
    if (title === '') {
      toast.error('Title must not be empty');
      return;
    }

    if (content === '') {
      toast.error('Content must not be empty');
      return;
    }

    const reviewCreated = await handleCreateReview({
      spot_id: spotId,
      creator_id: creatorId,
      note,
      title,
      content,
    });

    if (reviewCreated) {
      onConfirm(reviewCreated as TReviewWithCreator);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      title="Add a review"
      onClose={onClose}
      onConfirm={async () => {
        await handleSubmit();
      }}
    >
      <div className="flex flex-col gap-2">
        <InputText
          labelText="Note"
          type="number"
          value={note}
          onChange={(e) => setNote(Number(e.target.value))}
        />
        <InputText
          labelText="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <InputText
          labelText="Content"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </Modal>
  );
};
