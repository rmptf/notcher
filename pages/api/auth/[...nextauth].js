import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import NextAuth from 'next-auth';
import { getToken } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import DiscordProvider from 'next-auth/providers/discord';
import GithubProvider from 'next-auth/providers/github';
import { dbConnect } from '../../../lib/dbConnect';
import clientPromise from '../../../lib/mongodb';

async function getTokenHandler(req, res) {
  const secret = process.env.NEXTAUTH_JWT_SECRET;
  const token = await getToken({
    req: req,
    secret: secret,
  });
  return token;
}

const createOptions = (req) => ({
  providers: [
    CredentialsProvider({
      id: 'jwt',
      name: 'jwt',
      credentials: {
        // email: {
        //   label: 'Email',
        //   type: 'text',
        // },
        // password: {
        //   label: 'Password',
        //   type: 'password',
        // },
      },

      async authorize(credentials) {
        console.log(req);
        // console.log(credentials);
        let decodedToken = await getTokenHandler(req);
        let decodedTokenSub = decodedToken.sub;
        let decodedTokenEmail = decodedToken.email;

        // console.log('--------------credentials--------------');
        // console.log(credentials);
        // console.log('--------------/credentials--------------');
        // console.log('--------------decodedToken--------------');
        // console.log(decodedToken);
        // console.log('--------------/decodedToken--------------');
        // console.log('--------------decodedTokenSub--------------');
        // console.log(decodedTokenSub);
        // console.log('--------------/decodedTokenSub--------------');
        // console.log('--------------decodedTokenEmail--------------');
        // console.log(decodedTokenEmail);
        // console.log('--------------/decodedTokenEmail--------------');

        const { db } = await dbConnect();
        const user = await db.collection('users').findOne({
          email: decodedTokenEmail,
        });
        return user;
      },
    }),

    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      profile(profile) {
        console.log(req);
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
    async jwt({ token, user, account, profile, isNewUser, res }) {
      if (user) {
        console.log('Setting User Role: ' + user.role);
        token.role = user.role;
        console.log(token);
      }
      // if (req.url === '/api/auth/session?update') {
      // const { db } = await dbConnect();
      // const user = await db
      //   .collection('users')
      //   .findOne({ _id: ObjectId(token.sub) });
      // const userRole = user.role;
      // console.log('Update User Role: ' + userRole);
      // token.role = userRole;
      // }
      return token;
    },

    async session({ session, token, user }) {
      if (session.user) {
        session.user.role = token.role;
      }
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
