import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import CatCard from '../components/cards/cat/CatCard';
import { mockCatCardProps } from '../components/cards/cat/CatCard.mocks';
import styles from '../styles/Home.module.css';

const updateDbThenSignIn = async (role, email) => {
  const response = await fetch('/api/update-user/with-post', {
    method: 'POST',
    body: JSON.stringify({ role1: role, email1: email }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const res = await response.json();
  console.log(res);
  signIn('jwt', { callbackUrl: '/' });
};

export default function Home(blogsdata) {
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

      <button onClick={() => updateDbThenSignIn(role, email)}>
        Update BD then sign in then redirect.
      </button>
      <br></br>
      <button onClick={() => signIn('jwt', { callbackUrl: '/blog' })}>
        Sign in with w/ redirect
      </button>
      <br></br>
      <button onClick={() => signIn('jwt')}>Sign in with JWT</button>
      <br></br>
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
