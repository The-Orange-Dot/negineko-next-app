import NextAuth from "next-auth";
import TwitchProvider from "next-auth/providers/twitch";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    TwitchProvider({
      clientId: process.env.TWITCH_CLIENT_ID,
      clientSecret: process.env.TWITCH_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  secret: process.env.SECRET,
});
