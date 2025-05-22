import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      // Allow emails ending with @my.jru.edu or @jru.edu
      if (profile?.email && (profile.email.endsWith("@my.jru.edu") || profile.email.endsWith("@jru.edu"))) {
        return true;
      }
      return false;
    },
  },
  pages: {
    signIn: '/', // Use your custom login page for sign in and errors
    error: '/',  // Redirect errors to your login page
  },
});

export { handler as GET, handler as POST }; 