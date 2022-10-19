import CatCard from './CatCard';
import { mockCatCardProps } from './CatCard.mocks';

export default {
  title: 'cards/CatCard',
  component: CatCard,
  argTypes: {},
};

const Template = (args) => <CatCard {...args} />;

export const Base = Template.bind({});

Base.args = { ...mockCatCardProps.base };
