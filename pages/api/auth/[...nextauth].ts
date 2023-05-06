import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

import prisma from '@/app/libs/prismadb';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || credentials?.password) {
          throw new Error('Invalid credentials');
        }
        //prisma schema lets you directly search through the whole DB using the mongoDB commands
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        //If the user doesn't exist or the user password isnt hashed that means the user isnt properly added to the account list of DB
        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid Credential');
        }

        //check if the password is correct
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error('Invalid Credentials');
        }
        //if it passes all the tests return the user
        return user;
      },
    }),
  ],
  // If any error occurs it will redirect us to the auth page
  //   Specify URLs to be used if you want to create custom sign in, sign out and error pages.

  // Pages specified will override the corresponding built-in page.
  pages: {
    signIn: '/',
  },
  //only development time we can see the errors into the terminal
  debug: process.env.NODE_ENV === 'development',
  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
