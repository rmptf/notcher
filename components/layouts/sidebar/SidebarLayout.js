import Link from 'next/link';
import styles from './SidebarLayout.module.css';

export const ISidebarLayout = {
  sampleTextProp: '',
};

function SidebarLayout({ sampleTextProp }) {
  return (
    <nav className={styles.nav}>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>
    </nav>
  );
}

export default SidebarLayout;
