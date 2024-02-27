import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { getServerSession, Session } from 'next-auth'
import GithubProvider from "next-auth/providers/github"
import { env } from "./env"
import { prisma } from "./prisma"

export const authOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
      profile(profile){
        return {
          id: profile.id.toString(),
          username:profile.login,
          name:profile.name,
          email:profile.email,
          image:profile.avatar_url,
        }
      }
    }),
    // ...add more providers here
  ],
  callbacks:{
    session({ session, user }: { session: Session | null; user: any }){
        if(!session?.user) return session;
        session.user.id = user.id;
        return session
    }
  }
}

export const getAuthSession = async()=> {
    const session = await getServerSession(authOptions)
    return session;
}