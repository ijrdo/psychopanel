import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials as any;

        const res = await axios({
          method: "GET",
          url: "https://hm5m25z57j.execute-api.us-east-2.amazonaws.com/production/auth/login",
          auth: {
            username: username,
            password: password,
          },
          params: {
            force: "true",
          },
        });
        if (res) {
          console.log(res.data.token);
          return res.data;
        } else return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
