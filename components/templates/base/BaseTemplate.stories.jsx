import BaseTemplate from './BaseTemplate';
import { mockBaseTemplateProps } from './BaseTemplate.mocks';

export default {
  title: 'templates/BaseTemplate',
  component: BaseTemplate,
  argTypes: {},
};

const Template = (args) => <BaseTemplate {...args} />;

export const Base = Template.bind({});

Base.args = { ...mockBaseTemplateProps.base };

// TS
// import { ComponentMeta, ComponentStory } from '@storybook/react';
// import BaseTemplate, { IBaseTemplate } from './BaseTemplate';
// import { mockBaseTemplateProps } from './BaseTemplate.mocks';

// export default {
//   title: 'templates/BaseTemplate',
//   component: BaseTemplate,
//   // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
//   argTypes: {},
// } as ComponentMeta<typeof BaseTemplate>;

// // More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// const Template: ComponentStory<typeof BaseTemplate> = (args) => (
//   <BaseTemplate {...args} />
// );

// export const Base = Template.bind({});
// Base.args = {...mockBaseTemplateProps.base,} as IBaseTemplate;
