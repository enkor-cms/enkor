import { Meta, StoryFn } from '@storybook/react';

import { Review as ReviewComponent, TReviewProps } from '../index';

const Template: StoryFn<TReviewProps> = (args: TReviewProps) => (
  <>
    <ReviewComponent {...args} />
  </>
);

export const Review = Template.bind({});

const meta: Meta = {
  title: 'Review / Review',
  component: ReviewComponent,
  args: {
    review: {
      id: '5f5fd265-5d6b-424b-b318-96144d7bcd2e',
      created_at: '2023-03-12T11:37:22.265853+00:00',
      updated_at: '2023-03-12T11:37:22.265853+00:00',
      title: 'Beautiful !',
      content: 'Very nice place',
      creator_id: '9a51440b-313d-4a42-98df-3e5b14432793',
      spot_id: 'd9b5c929-2a99-459b-b18c-706dbf8ac6d1',
      note: 4,
      like_count: 12,
      creator_avatar_url:
        'https://lh3.googleusercontent.com/a/AGNmyxbuu_PktZiIzftP8xPi_BKXFgrjjcVVGoCOWgqkgVg=s96-c',
    },
  },
};

export default meta;
