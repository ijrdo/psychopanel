"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

// export const metadata = {
//   title: "Psychosocial-Panel",
//   description: "Psychosocial admin panel",
// };

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout(
  {
    children,
  }: {
    children: React.ReactNode;
  },
  session: Session
) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
