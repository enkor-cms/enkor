import { Meta, StoryFn } from '@storybook/react';

import { SpotModal as SpotModalComponent, TSpotModalProps } from '../index';

const Template: StoryFn<TSpotModalProps> = (args: TSpotModalProps) => (
  <>
    <SpotModalComponent {...args} />
  </>
);

export const Button = Template.bind({});

const meta: Meta = {
  title: 'Spot / SpotModal',
  component: SpotModalComponent,
  args: {
    spot: {
      created_at: '2023-03-10T14:04:40.516607+00:00',
      updated_at: '2023-03-10T14:04:40.516607+00:00',
      name: 'Agyriaceae',
      description:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
      image: [
        'https://robohash.org/inciduntautassumenda.jpg?size=400x400&set=set1',
      ],
      location: {
        id: 71,
        created_at: '2023-03-10T08:57:38.777617+00:00',
        city: 'Trélazé',
        department: 'Pays de la Loire',
        country: null,
        latitude: 49.6488646,
        longitude: 1.7314818,
      },
      type: 'Indoor',
      creator: '9a51440b-313d-4a42-98df-3e5b14432793',
      difficulty: 'Easy',
      id: 'd9b5c929-2a99-459b-b18c-706dbf8ac6d1',
    },
  },
};

export default meta;
