import BaseTemplate from './BaseTemplate';
import { mockBaseTemplateProps } from './BaseTemplate.mocks';

let element = {
  title: 'templates/BaseTemplate',
  component: BaseTemplate,
  argTypes: {},
};

export default element;

const Template = (args) => <BaseTemplate {...args} />;

export const Base = Template.bind({});

Base.args = { ...mockBaseTemplateProps.base };
