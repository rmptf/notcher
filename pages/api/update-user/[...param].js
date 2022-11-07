// import { getSession } from 'next-auth/react';
// import { ObjectId } from 'mongodb';
// import { signIn } from 'next-auth/react';
import { dbConnect } from '../../../lib/dbConnect';

export default async function handler(req, res) {
  const { db } = await dbConnect();
  try {
    const { param } = req.query;
    const email = param[1];
    await db.collection('users').updateOne(
      { email: email },
      {
        $set: {
          role: param[0],
        },
      }
    );
    // await signIn('jwt', { callbackUrl: '/blog' });
    // res.redirect(307, '/api/auth/session?update');
    res.redirect(307, 'http://localhost:3000/api/auth/callback/jwt');
  } catch (err) {
    res.status(500).send({ error: 'failed to fetch data' });
  }
  // await signIn('jwt', { callbackUrl: '/blog' });
  // await signIn('update-user', {
  //   user: JSON.stringify({ ...user, newProperty: true }),
  // });
  // await signIn('jwt', {});
}

// export async function getServerSideProps(context) {
//   const session = await getSession(context);

//   if (!session) {
//     return {
//       redirect: {
//         //Tutorial recomends using an env var instead of hardcoding url
//         // destination: `/api/auth/signin?callbackUrl=http://localhost:3000/blog`,
//         destination: '/api/auth/session?update',
//         permanent: false,
//       },
//     };
//   }

//   // console.log(session);
//   return {
//     props: {
//       blogsdata: session
//         ? 'List of 100 personalized blogs'
//         : 'List of free blogs',
//     },
//   };
// }
