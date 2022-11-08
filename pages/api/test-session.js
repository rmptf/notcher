import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
export default async (req, res) => {
  //   res.send({
  //   error:
  //     'You must be signed in to view the protected content on this page.',
  // });
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session) {
    res.send({
      content:
        'This is protected content. You can access this content because you are signed in.',
      session,
    });
  } else {
    res.send({
      error:
        'You must be signed in to view the protected content on this page.',
    });
  }
};

// import { authOptions } from './auth/[...nextauth]';
// // import { getSession } from 'next-auth/react';
// // const handler = async (req, res) => {
//   // const session = await getSession({ req });
//   if (!session) {
//     res.status(401).json({ error: 'Unauthenticated user' });
//   } else {
//     res.status(200).json({ content: 'Success', session });
//   }
// };
// // export default handler;
