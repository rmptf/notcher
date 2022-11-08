import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import NextAuth from 'next-auth';
import { getToken } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import DiscordProvider from 'next-auth/providers/discord';
import GithubProvider from 'next-auth/providers/github';
import { dbConnect } from '../../../lib/dbConnect';
import clientPromise from '../../../lib/mongodb';

const authOptions = (req) => ({
  providers: [
    CredentialsProvider({
      id: 'jwt',
      credentials: {},
      async authorize(credentials) {
        const secret = process.env.NEXTAUTH_JWT_SECRET;
        let decodedToken = await getToken({ req, secret });
        // let decodedTokenSub = decodedToken.sub;
        let decodedTokenEmail = decodedToken.email;
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
    colorScheme: 'dark',
  },
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
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.role = user.role;
        // console.log(token);
      }
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

// fix this export
// causing issies for unstable_getServerSession in test-session
export default async (req, res) => {
  return NextAuth(req, res, authOptions(req));
};
