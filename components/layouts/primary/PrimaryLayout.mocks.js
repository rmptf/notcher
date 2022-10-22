import { IPrimaryLayout } from './PrimaryLayout';

Object.assign(IPrimaryLayout, {
  children: '{{component}}',
});

const base = IPrimaryLayout;

export const mockPrimaryLayoutProps = {
  base,
};
