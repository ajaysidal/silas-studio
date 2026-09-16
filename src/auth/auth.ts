import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import type { Session, User } from "next-auth"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NextAuthFn = NextAuth as any

export const { handlers, auth, signIn, signOut } = NextAuthFn({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }: { session: Session; user: User }) {
      if (session.user) {
        session.user.id = user.id
      }
      return session
    },
  },
  trustHost: true,
  debug: true,
})