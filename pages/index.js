import { signIn, useSession } from 'next-auth/react';
import CatCard from '../components/cards/cat/CatCard';
import { mockCatCardProps } from '../components/cards/cat/CatCard.mocks';
import styles from '../styles/Home.module.css';

const updateDbThenSignIn = async (email, role) => {
  const response = await fetch('/api/update-user/with-post', {
    method: 'POST',
    body: JSON.stringify({ email: email, role: role }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  signIn('jwt', { callbackUrl: '/' });
  const res1 = await response.json();
  console.log(res1);
};

export default function Home() {
  const { data: session, status } = useSession();

  let email;
  if (session) {
    email = session.user.email;
  } else {
    email = '';
  }
  let role = 'Randomass Role';

  function logSession() {
    console.log(session);
  }

  return (
    <section className={styles.main}>
      <h1>User Name: {session ? `${session.user.name} ` : 'Guest'}</h1>
      <h1>User Email: {session ? `${session.user.email} ` : 'No User'}</h1>
      <h1>User Role: {session ? `${session.user.role} ` : 'No User'}</h1>
      <h1>Status: {status}</h1>

      <button onClick={() => updateDbThenSignIn(email, 'User')}>
        Change role to User then sign in then redirect.
      </button>
      <br></br>
      <button onClick={() => updateDbThenSignIn(email, 'Admin')}>
        Change role to Admin then sign in then redirect.
      </button>
      <br></br>
      <button onClick={() => updateDbThenSignIn(email, 'Random Role')}>
        Change role to Random Role then sign in then redirect.
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
