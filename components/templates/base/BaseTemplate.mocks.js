import { IBaseTemplate } from './BaseTemplate';

IBaseTemplate.sampleTextProp = 'Hello Worms!';
const base = IBaseTemplate;

export const mockBaseTemplateProps = {
  base,
};

// TS
// import { IBaseTemplate } from './BaseTemplate';

// const base: IBaseTemplate = {
//   sampleTextProp: 'Hello world!',
// };

// export const mockBaseTemplateProps = {
//   base,
// };
