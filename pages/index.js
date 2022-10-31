import { useSession } from 'next-auth/react';
import CatCard from '../components/cards/cat/CatCard';
import { mockCatCardProps } from '../components/cards/cat/CatCard.mocks';
import styles from '../styles/Home.module.css';

export default function Home() {
  const { data: session, status } = useSession();

  function logSession() {
    console.log(session);
  }

  return (
    <section className={styles.main}>
      <h1>User Name: {session ? `${session.user.name} ` : 'Guest'}</h1>
      <h1>User Email: {session ? `${session.user.email} ` : 'No User'}</h1>
      <h1>Status: {status}</h1>
      <button onClick={logSession}>Log Session</button>
      <h1 className={styles.title}>
        Welcome to <a href="https://nextjs.org">Notcher</a>
      </h1>
      <CatCard {...mockCatCardProps.base} />
    </section>
  );
}
