import { PrismaAdapter } from '@auth/prisma-adapter';
import { type NextApiHandler } from 'next';
import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { prisma } from '~/lib/prisma';

const options: NextAuthOptions = {
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    CredentialsProvider({
      name: `credentials`,
      credentials: {
        email: { label: `email`, type: `email` },
        password: { label: `Password`, type: `password` },
      },
      authorize: async (credentials) => {
        try {
          const res = await fetch(
            `${process.env.NEXTAUTH_URL}/api/user/signin`,
            {
              method: `POST`,
              headers: { 'Content-Type': `application/json` },
              body: JSON.stringify(credentials),
            },
          );
          const user = await res.json();
          return user;
        } catch (error) {
          console.error(`An error occured: `, error);
          return null;
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  pages: {
    signIn: `/login`,
  },
};

const authHandler: NextApiHandler = (req, res) => {
  NextAuth(req, res, options);
};

export default authHandler;
