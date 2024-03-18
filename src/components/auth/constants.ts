import { type NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@/lib/prisma";

const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;

if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET)
  throw new Error(
    "Please add your GITHUB_ID and GITHUB_SECRET to your .env file",
  );

const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
  },
  adapter: PrismaAdapter(prisma),
  cookies: {
    sessionToken: {
      name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        // When working on localhost, the cookie domain must be omitted entirely (https://stackoverflow.com/a/1188145)
        domain: VERCEL_DEPLOYMENT ? ".vercel.pub" : undefined,
        secure: VERCEL_DEPLOYMENT,
      },
    },
  },
  callbacks: {
    session: async ({ session, user }) => ({
      ...session,
      user: {
        ...user,
        id: user.id,
        name: user.name,
      },
    }),
  },
};

export { authOptions };
