import { getSession } from 'next-auth/react';

function Blog({ blogsdata }) {
  return <h1>Blog Page - {blogsdata}</h1>;
}

export default Blog;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        //Tutorial recomends using an env var instead of hardcoding url
        destination: `/api/auth/signin?callbackUrl=http://localhost:3000/blog`,
        premanent: false,
      },
    };
  }

  // console.log(session);
  return {
    props: {
      blogsdata: session
        ? 'List of 100 personalized blogs'
        : 'List of free blogs',
    },
  };
}
