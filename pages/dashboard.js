import { signIn, useSession } from 'next-auth/react';
import React, { useEffect } from 'react';

export default function Dashboard() {
  const { status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') signIn();
  }, [status]);

  if (status !== 'authenticated') {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <div>Dashboard</div>
    </>
  );
}
