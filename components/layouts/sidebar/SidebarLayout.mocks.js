import { ISidebarLayout } from './SidebarLayout';

Object.assign(ISidebarLayout, {
  sampleTextProp: 'Hello world!',
});

const base = ISidebarLayout;

export const mockSidebarLayoutProps = {
  base,
};
