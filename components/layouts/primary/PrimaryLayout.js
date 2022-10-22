import Head from 'next/head';
import styles from './PrimaryLayout.module.css';

export const IPrimaryLayout = {
  sampleTextProp: '',
};

function PrimaryLayout({ children, sampleTextProp }) {
  return (
    <>
      <Head>
        <title>Primary Layout Example</title>
      </Head>
      <main className={styles.main}>{children}</main>
    </>
  );
}

export default PrimaryLayout;
