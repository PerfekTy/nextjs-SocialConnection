import { Layout } from "@/components/layout";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";
import NextAuthSessionProvider from "./providers/session-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Social Connection",
  description: "Social App too connect people!",
  icons: "/icon.ico",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Toaster />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextAuthSessionProvider>
            <Layout>{children}</Layout>
          </NextAuthSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
