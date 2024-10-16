import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import User from '@/models/users.model';
import dbConnect from '@/lib/db';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;

        await dbConnect();
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error('Invalid Email');
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (isPasswordCorrect) {
          return user;
        } else throw new Error('Incorrect Password');
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        const { _id, fullName, email, avatar } = user;
        token.user = {
          id: _id.toString(),
          fullName,
          email,
          image: avatar,
        };
      }
      return token;
    },
    session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
});
