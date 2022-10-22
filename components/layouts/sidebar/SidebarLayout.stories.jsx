import SidebarLayout from './SidebarLayout';
import { mockSidebarLayoutProps } from './SidebarLayout.mocks';

let element = {
  title: 'layouts/SidebarLayout',
  component: SidebarLayout,
  argTypes: {},
};

export default element;

const Template = (args) => <SidebarLayout {...args} />;

export const Base = Template.bind({});

Base.args = { ...mockSidebarLayoutProps.base };
