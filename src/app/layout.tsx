import "./globals.css";
import type { Metadata } from "next";
import { Inter, Kanit, Mitr, Noto_Sans_Thai, IBM_Plex_Sans_Thai, Prompt, Itim, Krub } from "next/font/google";
import Navbar from "./(main)/Navbar";
import NextAuthProvider from "@/provider/NextAuthProvider";
import QueryClientProvider from "@/provider/QueryClientProvider";

const prompt = Prompt({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  preload: true,
  style: "normal",
  subsets: ["latin-ext", "thai"],
});

export const metadata: Metadata = {
  title: "House for Rent",
  description: "The best house for rent in Thailand",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={prompt.className}>
        <NextAuthProvider>
          <QueryClientProvider>
            {children}
          </QueryClientProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}