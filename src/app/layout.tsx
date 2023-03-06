import "./globals.css";
import { Inter } from "next/font/google";

export const metadata = {
  title: "Psychosocial-Panel",
  description: "Psychosocial admin panel",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
