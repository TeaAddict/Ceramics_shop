import NextAuth, { Account, Profile, User } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { AuthOptions } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { addUserToDb } from "@/utils/server/addUserToDb";

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({
      user,
      account,
      profile,
    }: {
      user: User | AdapterUser;
      account: Account | null;
      profile?: Profile | undefined;
    }): Promise<boolean> {
      addUserToDb(user);
      return true;
    },
  },
};

export default NextAuth(authOptions);
