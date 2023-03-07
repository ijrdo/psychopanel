"use client";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";

export default function Home() {
  const data = useSession();
  return (
    <main>
      <button onClick={() => signIn()}>Login</button>
      <button onClick={() => signOut()}>Log Out</button>
    </main>
  );
}
