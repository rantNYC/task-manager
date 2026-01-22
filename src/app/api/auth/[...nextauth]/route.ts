import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { verifyUser } from '@/lib/core/core';

const handler = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await verifyUser(credentials.email, credentials.password);
        if (!user) return null;

        return {
          id: String(user.id),
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          email: token.email as string,
          name: token.name as string | null,
        };
      }
      return session;
    },
  },

  pages: {
    signIn: '/signin',
  },
});

export { handler as GET, handler as POST };