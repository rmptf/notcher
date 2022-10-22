import PrimaryLayout from './PrimaryLayout';
import { mockPrimaryLayoutProps } from './PrimaryLayout.mocks';

let element = {
  title: 'layouts/PrimaryLayout',
  component: PrimaryLayout,
  argTypes: {},
};

export default element;

const Template = (args) => <PrimaryLayout {...args} />;

export const Base = Template.bind({});

Base.args = { ...mockPrimaryLayoutProps.base };
