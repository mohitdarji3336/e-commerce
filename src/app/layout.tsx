import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import {Navigation} from "./components/navigation";
import AuthButtons from "./components/AuthButtons";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Modern E-Commerce Store",
  description: "A modern and fully responsive e-commerce website built with Next.js and Tailwind CSS",
};

export default function RootLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="bg-slate-900 text-white p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src="/shopverse-logo.svg" alt="ShopVerse Logo" className="h-10 w-10" />
              <div>
                <span className="text-2xl font-extrabold tracking-tight text-white">ShopVerse</span>
                <div className="text-xs text-blue-200 font-medium leading-tight">Explore. Shop. Enjoy.</div>
              </div>
            </div>
            <Navigation />
            <AuthButtons />
          </div>
        </header>

        {children}
        <footer className="bg-slate-900 text-white p-4 text-center">
          © 2024 Modern E-Commerce Store. All rights reserved.
        </footer>

      </body>
    </html>
    </ClerkProvider>
  );
}


