import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { ObjectId } from 'mongodb';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import DiscordProvider from 'next-auth/providers/discord';
import GithubProvider from 'next-auth/providers/github';
import { dbConnect } from '../../../lib/dbConnect';
import clientPromise from '../../../lib/mongodb';

// Move this out of []...nextauth]
// async function getRoleFromDB(userId, req, res) {
//   const { db } = await dbConnect();
//   try {
//     const user = await db
//       .collection('users')
//       .findOne({ _id: ObjectId(userId) });
//     return user.role;
//   } catch (err) {
//     res.status(500).send({ error: 'failed to fetch data' });
//   }
// }

// const jwtProvider = CredentialsProvider({
//   id: 'jwt',
//   name: 'jwt',
//   credentials: {},
//   async authorize(_credentials, req) {
//     console.log('Inside JWT Provider function');
// let cookieData = req.headers.cookie;
// const token = cookieData['next-auth.session-token'];
// const cookies = parseCookies(req.headers?.cookie || '');
// const token = cookies['next-auth.session-token'];
// console.log(cookieData);
// if (!token) return null;
// next-auth.csrf-token=d48b910fed0fd3113761265d78392c1c1ee8c6e624804f05c046a846fe4d2d5c%7Cf2fd2622f3228b104f8278d868c41c6cfb6f53ff925c7d451b1984943cc1029a;
// next-auth.callback-url=http%3A%2F%2Flocalhost%3A3000%2F;
// next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..SS3ojoUwBoKJIHWJ.XosldCUrd88yvO5hW2Kk_ZuFN0mkMYCGT-mhs8LeA2eNG-_Dnt_Em4E0CyRxBfTd0Vth6TDjPI4834uNba6GGdA7VTivcVSoA7IpdqjsfA4zKgZzRpXCpTH7ZupDDi_M2Ljvob6ixGkdw-2J0_t58-edxbNMyo8Xcln7xpNFp90eMu_pVMUrZtoYMiyBvCCsfrqo6_iHJDV5PYKoMUPFuPb6momPFX9nbgazhwAWNJFC-62Iqw.qWdZP7QmtbpFQ4EaEUdzCg

// next-auth.csrf-token=d48b910fed0fd3113761265d78392c1c1ee8c6e624804f05c046a846fe4d2d5c%7Cf2fd2622f3228b104f8278d868c41c6cfb6f53ff925c7d451b1984943cc1029a;
// next-auth.callback-url=http%3A%2F%2Flocalhost%3A3000%2F;
// next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..SS3ojoUwBoKJIHWJ.XosldCUrd88yvO5hW2Kk_ZuFN0mkMYCGT-mhs8LeA2eNG-_Dnt_Em4E0CyRxBfTd0Vth6TDjPI4834uNba6GGdA7VTivcVSoA7IpdqjsfA4zKgZzRpXCpTH7ZupDDi_M2Ljvob6ixGkdw-2J0_t58-edxbNMyo8Xcln7xpNFp90eMu_pVMUrZtoYMiyBvCCsfrqo6_iHJDV5PYKoMUPFuPb6momPFX9nbgazhwAWNJFC-62Iqw.qWdZP7QmtbpFQ4EaEUdzCg

// const token =
//   'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..SS3ojoUwBoKJIHWJ.XosldCUrd88yvO5hW2Kk_ZuFN0mkMYCGT-mhs8LeA2eNG-_Dnt_Em4E0CyRxBfTd0Vth6TDjPI4834uNba6GGdA7VTivcVSoA7IpdqjsfA4zKgZzRpXCpTH7ZupDDi_M2Ljvob6ixGkdw-2J0_t58-edxbNMyo8Xcln7xpNFp90eMu_pVMUrZtoYMiyBvCCsfrqo6_iHJDV5PYKoMUPFuPb6momPFX9nbgazhwAWNJFC-62Iqw.qWdZP7QmtbpFQ4EaEUdzCg';
// const cookies = parseCookies(req.headers?.cookie || '');
// const token = cookies['next-auth.session-token'];
// If token is valid, return userId from token
// const decodedToken = decodeJWT({
//   token,
//   secret: process.env.NEXTAUTH_SECRET,
// });

// console.log(decodedToken);
// 635e8531c6aee5acdc9088ed
// if (decodedToken) return { id: decodedToken.sub };
// return { id: '635e8531c6aee5acdc9088ed' };
// Return null if user data could not be retrieved
// return null;

// const cookies = parseCookies(req.headers?.cookie || '');
// const token = cookies['next-auth.session-token'];
// // If token is valid, return userId from token
// const decodedToken = decodeJWT({
//   token,
//   secret: process.env.NEXTAUTH_SECRET,
// });
// if (decodedToken) return { id: decodedToken.sub };

// // Return null if user data could not be retrieved
// return null;
// },
// });

const createOptions = (req) => ({
  providers: [
    // CredentialsProvider({
    //   id: 'update-user',
    //   credentials: {},
    //   authorize(credentials) {
    //     return { user: JSON.parse(credentials.user) };
    //   },
    // }),

    // providers: [emailProvider, jwtProvider],
    // callbacks: {
    //   jwt: async ({ token, user }) => {
    //     // Fetch and add user info to token after sign in.
    //     if (user?.id) {
    //       const userInfo = await fetchUserInfo(user.id)
    //       if (userInfo) token = { ...token, user: userInfo }
    //     }

    //     return token
    //   }
    // },

    // emailProvider,
    // jwtProvider,

    CredentialsProvider({
      id: 'jwt',
      credentials: {},
      authorize(credentials) {
        // return { user: JSON.parse(credentials.user) };
        const user = {
          sub: '635e8531c6aee5acdc9088ed',
          name: 'unkyryry#2942',
          email: 'rmpotthoff@gmail.com',
        };
        return { user };
      },
    }),

    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.login,
          email: profile.email,
          role: 'USER',
        };
      },
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.username + '#' + profile.discriminator,
          email: profile.email,
          role: 'USER',
        };
      },
    }),
  ],
  theme: {
    colorScheme: 'light',
  },
  // pages: {
  //   signIn: '/auth',
  // },
  debug: process.env.NODE_ENV === 'development',
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user, res }) {
      if (user) {
        console.log('Setting User Role: ' + user.role);

        token.role = user.role;

        console.log(token);
      }
      // Make sure this doesnt have security issues
      if (req.url === '/api/auth/session?update') {
        const { db } = await dbConnect();
        const user = await db
          .collection('users')
          .findOne({ _id: ObjectId(token.sub) });
        const userRole = user.role;
        // const userRole = await getRoleFromDB(token.sub);
        console.log('Update User Role: ' + userRole);
        token.role = userRole;
        // Figure out redirect
        // res.redirect(307, '/');
        // };
      }
      return token;
    },

    async session({ session, token, user }) {
      if (session.user) {
        session.user.role = token.role;
      }
      // console.log(session);
      return session;
    },
  },
});
export default async (req, res) => {
  return NextAuth(req, res, createOptions(req));
};

// --------------------------------------------------------------------------------------------------------------------------------------------

// Callback that lists all values JWT understands:

// async jwt({ token, user, account, profile, isNewUser }) {
//   console.log('-----------JWT All Objects token-----------');
//   console.log(token);

//   console.log('-----------JWT All Objects user-----------');
//   console.log(user);

//   console.log('-----------JWT All Objects account-----------');
//   console.log(account);

//   console.log('-----------JWT All Objects profile-----------');
//   console.log(profile);

//   console.log('-----------JWT All Objects isNewUser-----------');
//   console.log(isNewUser);
// },

// --------------------------------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------------------------------------------------------

// const createOptions = (req) => ({
//   // ...
//   callbacks: {
//     async jwt({ token, ...params }) {
//       if (req.url === "/api/auth/session?update") {
//         // hit the DB and return token with updated values. e.g.:
//         token.name = "Updated Mr. Johnson";
//       }
//       return token;
//     },
//     async session({ session, token }) {
//         console.log(token);
//         session.user = {
//             ...session.user,
//             name: token.name
//         }
//         return session;
//     },
//   },
// });

// export default async (req, res) => {
//   return NextAuth(req, res, createOptions(req));
// };

// --------------------------------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------------------------------------------------------

// refresh session by reloggin user
// Possible answer here: https://github.com/nextauthjs/next-auth/issues/2269
// From this Stack-O topic: https://stackoverflow.com/questions/70405436/next-auth-how-to-update-the-session-client-side
// Code:

// const createOptions = (req) => ({
//   // ...
//   callbacks: {
//     async jwt({ token, ...params }) {
//       if (req.url === "/api/auth/session?update") {
//           const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/get/${token.email}`);
//           const newUser = await response.json();
//           token.hasAcceptedTerms = newUser.hasAcceptedTerms;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//         if (session.user != null && token.hasAcceptedTerms != null) {
//             session.user.hasAcceptedTerms = token?.hasAcceptedTerms;
//         }

//         return Promise.resolve(session);
//      },
//   },
// });

// export default async (req, res) => {
//   return NextAuth(req, res, createOptions(req));
// };

// Then somewhere in your client you can make an AJAX call to the /api/auth/session?update route.

// --------------------------------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------------------------------------------------------

// -----------JWT All Objects token-----------
// {
//   name: 'unkyryry#2942',
//   email: 'rmpotthoff@gmail.com',
//   picture: undefined,
//   sub: '635e8531c6aee5acdc9088ed'
// }
// -----------JWT All Objects user-----------
// {
//   id: '635e8531c6aee5acdc9088ed',
//   name: 'unkyryry#2942',
//   email: 'rmpotthoff@gmail.com',
//   role: 'USER',
//   emailVerified: null
// }
// -----------JWT All Objects account-----------
// {
//   provider: 'discord',
//   type: 'oauth',
//   providerAccountId: '214159538104827905',
//   access_token: 'EdBv6owu91u0cMtPLRlXfA1CpFE1hc',
//   expires_at: 1667747429,
//   refresh_token: '4UpBPDAgENKvdrltYCp8GousdjrcT5',
//   scope: 'identify email',
//   token_type: 'Bearer'
// }
// -----------JWT All Objects profile-----------
// {
//   id: '214159538104827905',
//   username: 'unkyryry',
//   avatar: null,
//   avatar_decoration: null,
//   discriminator: '2942',
//   public_flags: 0,
//   flags: 0,
//   banner: null,
//   banner_color: null,
//   accent_color: null,
//   locale: 'en-US',
//   mfa_enabled: false,
//   premium_type: 0,
//   email: 'rmpotthoff@gmail.com',
//   verified: true
// }
// -----------JWT All Objects isNewUser-----------
// false

// --------------------------------------------------------------------------------------------------------------------------------------------
