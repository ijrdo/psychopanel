import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        chutad: { label: "Chutad", type: "text" },
      },
      async authorize(credentials) {
        const userLog = credentials;
        console.log(userLog);
        // const data = {
        //   jwt: "dsujkfgs;djkofgsdhk;fgadhlsfg;hksdgfkhsd",
        //   id: "fgd",
        // };
        const user = {
          id: "1",
          name: "J Smith",
          email: "jsmith@example.com",
          hello: "dfhskifgds",
        };

        if (
          userLog?.username === "oneitguys" &&
          userLog.password === "oneit.lendi"
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  theme: {
    colorScheme: "light", // "auto" | "dark" | "light"
    // brandColor: "#FF0000", // Hex color value
    logo: "", // Absolute URL to logo image
  },
};

export default NextAuth(authOptions);
