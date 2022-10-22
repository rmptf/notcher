import CatCard from './CatCard';
import { mockCatCardProps } from './CatCard.mocks';

let element = {
  title: 'cards/CatCard',
  component: CatCard,
  argTypes: {},
};

export default element;

const Template = (args) => <CatCard {...args} />;

export const Base = Template.bind({});
export const Base2 = Template.bind({});

Base.args = { ...mockCatCardProps.base };
Base2.args = { ...mockCatCardProps.base2 };
