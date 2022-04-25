import NextAuth from "next-auth";
import TwitchProvider from "next-auth/providers/twitch";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export default NextAuth({
  // adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    TwitchProvider({
      clientId: process.env.TWITCH_CLIENT_ID,
      clientSecret: process.env.TWITCH_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
});
