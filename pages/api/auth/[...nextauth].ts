import NextAuth from "next-auth";
import TwitchProvider from "next-auth/providers/twitch";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),

  providers: [
    TwitchProvider({
      clientId: process.env.TWITCH_CLIENT_ID,
      clientSecret: process.env.TWITCH_CLIENT_SECRET,
      authorization: {
        params: { scope: "openid user:read:email moderation:read" },
      },
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, user }) {
      session = {
        ...session,
        ...session.user,
        id: user.id,
        likes: user.location_likes,
        streamer: user.streamer,
        mod: user.mod,
        modFor: user.modFor,
        mods: user.mods,
        modsPending: user.modsPending,
      };
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
});
