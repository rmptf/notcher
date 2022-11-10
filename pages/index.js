import { signIn, useSession } from 'next-auth/react';
import CatCard from '../components/cards/cat/CatCard';
import { mockCatCardProps } from '../components/cards/cat/CatCard.mocks';
import styles from '../styles/Home.module.css';

export default function Home() {
  const { data: session, status } = useSession();

  const submitRoleAndSignIn = async (email, role) => {
    const response = await fetch('/api/update-user', {
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

  const submitTestData = async (fakeData, testData) => {
    await fetch('/api/test-datas', {
      method: 'POST',
      body: JSON.stringify({ fakeData: fakeData, testData: testData }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

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
      <button onClick={() => submitTestData('stuff', 'other stuff')}>
        Submit Test Data
      </button>
      <br></br>
      <button onClick={() => submitRoleAndSignIn(email, 'User')}>
        Change role to User, SignIn, Redirect
      </button>
      <br></br>
      <button onClick={() => submitRoleAndSignIn(email, 'Admin')}>
        Change role to Admin, SignIn, Redirect
      </button>
      <br></br>
      <button onClick={() => submitRoleAndSignIn(email, 'Random Role')}>
        Change role to RandomRole, SignIn, Redirect
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
