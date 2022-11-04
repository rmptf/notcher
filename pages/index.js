import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import CatCard from '../components/cards/cat/CatCard';
import { mockCatCardProps } from '../components/cards/cat/CatCard.mocks';
import styles from '../styles/Home.module.css';

export default function Home() {
  const { data: session, status } = useSession();

  const role = 'Dynamic Role';
  let email;
  if (session) {
    email = session.user.email;
  } else {
    email = '';
  }

  function logSession() {
    console.log(session);
  }

  return (
    <section className={styles.main}>
      <h1>User Name: {session ? `${session.user.name} ` : 'Guest'}</h1>
      <h1>User Email: {session ? `${session.user.email} ` : 'No User'}</h1>
      <h1>User Role: {session ? `${session.user.role} ` : 'No User'}</h1>
      <h1>Status: {status}</h1>
      <button onClick={() => signIn('jwt')}>Sign in with JWT</button>
      <button>
        <Link href={`/api/update-user/USER/${email}`}>Change role to User</Link>
      </button>
      <br></br>
      <button>
        <Link href={`/api/update-user/ADMIN/${email}`}>
          Change role to Admin
        </Link>
      </button>
      <br></br>
      <button>
        <Link href={`/api/update-user/${role}/${email}`}>
          Change role dynamically
        </Link>
      </button>
      <br></br>
      <button onClick={logSession}>Log Session</button>
      <h1 className={styles.title}>
        Welcome to <a href="https://nextjs.org">Notcher</a>
      </h1>
      <CatCard {...mockCatCardProps.base} />
    </section>
  );
}
