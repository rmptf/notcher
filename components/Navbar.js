import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Navbar() {
  const { data: session, status } = useSession();
  //  Unsure why all console logs render twice in general and 4 times in this File.
  //   console.log('session => ', session);
  //   console.log('status => ', status);

  return (
    <nav className="header">
      <h1 className="logo">
        <a href="#">NextAuth</a>
      </h1>
      {/* Could never understant how useSession stops flickering */}
      {/* https://www.youtube.com/watch?v=ae8lxOOhOtY&list=PLC3y8-rFHvwgC9mj0qv972IO5DmD-H0ZH&index=73 */}
      <ul className={'main-nav'}>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        {session && status !== 'unauthenticated' && (
          <li>
            <Link href="/dashboard">
              <a>Dashboard</a>
            </Link>
          </li>
        )}
        <li>
          <Link href="/blog">
            <a>Blog</a>
          </Link>
        </li>
        {!session && status !== 'authenticated' && (
          <li>
            <Link href="/api/auth/signin">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  signIn();
                  // signIn('discord');
                }}
              >
                Sign In
              </a>
            </Link>
          </li>
        )}
        {session && status !== 'unauthenticated' && (
          <li>
            <Link href="/api/auth/signout">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                Sign Out
              </a>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
