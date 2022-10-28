import { SessionProvider } from 'next-auth/react';
import Navbar from '../components/Navbar';
import '../components/Navbar.css';
import '../styles/globals.css';

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const getLayout = Component.getLayout || ((page) => page);

  // return getLayout(<Component {...pageProps} />);

  return getLayout(
    <SessionProvider session={session}>
      <Navbar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
