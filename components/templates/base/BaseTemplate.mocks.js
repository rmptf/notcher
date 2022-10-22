import { IBaseTemplate } from './BaseTemplate';

Object.assign(IBaseTemplate, {
  sampleTextProp: 'Hello world!',
});

const base = IBaseTemplate;

export const mockBaseTemplateProps = {
  base,
};
